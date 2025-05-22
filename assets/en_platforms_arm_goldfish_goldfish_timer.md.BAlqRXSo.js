import{_ as t,c as r,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"GOLDFISH TIMER","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/goldfish/goldfish_timer.md","filePath":"en/platforms/arm/goldfish/goldfish_timer.md"}'),l={name:"en/platforms/arm/goldfish/goldfish_timer.md"};function o(i,e,s,_,c,h){return a(),r("div",null,e[0]||(e[0]=[n(`<h1 id="goldfish-timer" tabindex="-1">GOLDFISH TIMER <a class="header-anchor" href="#goldfish-timer" aria-label="Permalink to &quot;GOLDFISH TIMER&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>This device is used to return the current host time as a high-precision signed 64-bit nanosecond value to the kernel, with the starting point being an arbitrary loose reference point. The value should correspond to the QEMU &quot;vm_clock&quot;; that is, it should not be updated when the emulated system is not running, hence it cannot be directly based on the host clock.</p><h2 id="timer-registers" tabindex="-1">Timer Registers <a class="header-anchor" href="#timer-registers" aria-label="Permalink to &quot;Timer Registers&quot;">​</a></h2><pre><code>#define GOLDFISH_TIMER_TIME_LOW         0x0  /* Get current time, then return low-order 32-bits. */
#define GOLDFISH_TIMER_TIME_HIGH        0x4  /* Return high 32-bits from previous TIME_LOW read. */
#define GOLDFISH_TIMER_ALARM_LOW        0x8  /* Set low 32-bit value of alarm, then arm it. */
#define GOLDFISH_TIMER_ALARM_HIGH       0xc  /* Set high 32-bit value of alarm. */
#define GOLDFISH_TIMER_IRQ_ENABLED      0x10 /* Enable interrupts. */
#define GOLDFISH_TIMER_CLEAR_ALARM      0x14 /* Clear alarm. */
#define GOLDFISH_TIMER_ALARM_STATUS     0x18 /* Return 1 if alarm is armed, 0 if not. */
#define GOLDFISH_TIMER_CLEAR_INTERRUPT  0x1c /* Clear interrupt. */
</code></pre><h2 id="timer-read" tabindex="-1">Timer Read <a class="header-anchor" href="#timer-read" aria-label="Permalink to &quot;Timer Read&quot;">​</a></h2><p>To read the current time, the kernel must execute an IO_READ(TIME_LOW), which returns an unsigned 32-bit value, followed by an IO_READ(TIME_HIGH), which returns a signed 32-bit value corresponding to the high half of the complete value.</p><pre><code>static int goldfish_timer_current(struct oneshot_lowerhalf_s *lower_,
                                  struct timespec *ts)
{
  struct goldfish_timer_lowerhalf_s *lower =
    (struct goldfish_timer_lowerhalf_s *)lower_;
  irqstate_t flags;
  uint32_t l32;
  uint32_t h32;
  uint64_t nsec;

  DEBUGASSERT(lower != NULL);

  flags = spin_lock_irqsave(&amp;lower-&gt;lock);

  l32 = getreg32(lower-&gt;base + GOLDFISH_TIMER_TIME_LOW);
  h32 = getreg32(lower-&gt;base + GOLDFISH_TIMER_TIME_HIGH);
  nsec = ((uint64_t)h32 &lt;&lt; 32) | l32;

  ts-&gt;tv_sec  = nsec / NSEC_PER_SEC;
  ts-&gt;tv_nsec = nsec % NSEC_PER_SEC;

  spin_unlock_irqrestore(&amp;lower-&gt;lock, flags);

  return 0;
}
</code></pre><h2 id="timer-set-alarm" tabindex="-1">Timer Set Alarm <a class="header-anchor" href="#timer-set-alarm" aria-label="Permalink to &quot;Timer Set Alarm&quot;">​</a></h2><p>This device can also be used to set an alarm, as follows:</p><pre><code>IO_WRITE(ALARM_HIGH, &lt;high-value&gt;)  // Must be executed first.
IO_WRITE(ALARM_LOW, &lt;low-value&gt;)    // Must be executed second.
</code></pre><p>When the corresponding value is reached, the device will raise its IRQ. Note that if the alarm value is already older than the current time, the IRQ will be triggered immediately after the second IO_WRITE().</p><pre><code>static int goldfish_timer_start(struct oneshot_lowerhalf_s *lower_,
                                oneshot_callback_t callback,
                                void *arg,
                                const struct timespec *ts)
{
  struct goldfish_timer_lowerhalf_s *lower =
    (struct goldfish_timer_lowerhalf_s *)lower_;
  irqstate_t flags;
  uint64_t nsec;
  uint32_t l32;
  uint32_t h32;

  DEBUGASSERT(lower != NULL);

  flags = spin_lock_irqsave(&amp;lower-&gt;lock);

  lower-&gt;callback = callback;
  lower-&gt;arg      = arg;

  nsec  = ts-&gt;tv_sec * 1000000000 + ts-&gt;tv_nsec;
  l32   = getreg32(lower-&gt;base + GOLDFISH_TIMER_TIME_LOW);
  h32   = getreg32(lower-&gt;base + GOLDFISH_TIMER_TIME_HIGH);
  nsec += ((uint64_t)h32 &lt;&lt; 32) | l32;

  putreg32(1, lower-&gt;base + GOLDFISH_TIMER_IRQ_ENABLED);
  putreg32(nsec &gt;&gt; 32, lower-&gt;base + GOLDFISH_TIMER_ALARM_HIGH);
  putreg32(nsec, lower-&gt;base + GOLDFISH_TIMER_ALARM_LOW);

  spin_unlock_irqrestore(&amp;lower-&gt;lock, flags);

  return 0;
}
</code></pre><h2 id="timer-interrupt" tabindex="-1">Timer Interrupt <a class="header-anchor" href="#timer-interrupt" aria-label="Permalink to &quot;Timer Interrupt&quot;">​</a></h2><p>IO_WRITE(CLEAR_INTERRUPT, &lt;any&gt;) can be used to lower the IRQ level after the kernel has processed the alarm. IO_WRITE(CLEAR_ALARM, &lt;any&gt;) can be used to disarm the current alarm (if one exists).</p><p>Note: Currently, the alarm is used only on ARM-based systems. On MIPS-based systems, only TIME_LOW / TIME_HIGH are used.</p><pre><code>static int goldfish_timer_interrupt(int irq,
                                    void *context,
                                    void *arg)
{
  struct goldfish_timer_lowerhalf_s *lower = arg;
  oneshot_callback_t callback = NULL;
  irqstate_t flags;
  void *cbarg;

  DEBUGASSERT(lower != NULL);

  flags = spin_lock_irqsave(&amp;lower-&gt;lock);

  putreg32(1, lower-&gt;base + GOLDFISH_TIMER_CLEAR_ALARM);

  if (lower-&gt;callback != NULL)
    {
      callback        = lower-&gt;callback;
      cbarg           = lower-&gt;arg;
      lower-&gt;callback = NULL;
      lower-&gt;arg      = NULL;
    }

  spin_unlock_irqrestore(&amp;lower-&gt;lock, flags);

  /* Then perform the callback */

  if (callback)
    {
      callback(&amp;lower-&gt;lh, cbarg);
    }

  return 0;
}
</code></pre>`,17)]))}const u=t(l,[["render",o]]);export{g as __pageData,u as default};
