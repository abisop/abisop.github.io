import{_ as t,c as p,al as n,j as e,a as s,o as i}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"Timer Drivers","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/character/timers/timer.md","filePath":"en/components/drivers/character/timers/timer.md"}'),l={name:"en/components/drivers/character/timers/timer.md"};function o(r,a,c,d,h,u){return i(),p("div",null,a[0]||(a[0]=[n('<h1 id="timer-drivers" tabindex="-1">Timer Drivers <a class="header-anchor" href="#timer-drivers" aria-label="Permalink to &quot;Timer Drivers&quot;">​</a></h1><p>Files supporting the timer driver can be found in the following locations:</p><ul><li><strong>Interface Definition</strong>. The header file for the NuttX timer driver reside at <code>include/nuttx/timers/timer.h</code>. This header file includes both the application level interface to the timer driver as well as the interface between the &quot;upper half&quot; and &quot;lower half&quot; drivers. The timer driver uses a standard character driver framework.</li><li><strong>&quot;Upper Half&quot; Driver</strong>. The generic, &quot;upper half&quot; timer driver resides at <code>drivers/timers/timer.c</code>.</li><li><strong>&quot;Lower Half&quot; Drivers</strong>. Platform-specific timer drivers reside in <code>arch/&lt;architecture&gt;/src/&lt;hardware&gt;</code> directory for the specific processor <code>&lt;architecture&gt;</code> and for the specific <code>&lt;chip&gt;</code> timer peripheral devices.</li></ul><p>There are two ways to enable Timer Support along with the Timer Example. The first is faster and simpler. Just run the following command to use a ready config file with timer support and example included. You need to check if there&#39;s a timer config file for your specific chip. You may check it at the specific board&#39;s path: <code>/boards/&lt;arch&gt;/&lt;chip&gt;/&lt;variant&gt;/config</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> ./tools/configure.sh &lt;variant&gt;:timer</span></span></code></pre></div><p>And the second way is creating your own config file. To do so, follow the next instructions.</p><h2 id="enabling-the-timer-support-and-example-in-menuconfing" tabindex="-1">Enabling the Timer Support and Example in <code>menuconfing</code> <a class="header-anchor" href="#enabling-the-timer-support-and-example-in-menuconfing" aria-label="Permalink to &quot;Enabling the Timer Support and Example in `menuconfing`&quot;">​</a></h2>',7),e("blockquote",null,[e("ol",null,[e("li",null,"Select Timer Instances")]),e("p",null,[s("To select these timers browse in the "),e("code",null,"menuconfig"),s(" using the following path:")]),e("p",null,[s("Go into menu "),e("code",null,"System Type --> <Chip> Peripheral Selection"),s('{.interpreted-text role="menuselection"} and press '),e("code",{class:"interpreted-text",role:"kbd"},"Enter"),s(".")]),e("p",null,"Then select one or more timers according to availability."),e("ol",{start:"2"},[e("li",null,"Enable the Timer Support")]),e("p",null,[s("Go into menu "),e("code",null,"Device Drivers --> Timer Driver Support"),s('{.interpreted-text role="menuselection"} and press '),e("code",{class:"interpreted-text",role:"kbd"},"Enter"),s(". Then enable:")]),e("ul",null,[e("li",null,"[x] Timer Support"),e("li",null,"[x] Timer Arch Implementation")]),e("ol",{start:"3"},[e("li",null,"Include the Timer Example")]),e("p",null,[s("Go into menu "),e("code",null,"Application Configuration --> Examples"),s('{.interpreted-text role="menuselection"} and press '),e("code",{class:"interpreted-text",role:"kbd"},"Enter"),s(". Then select the Timer Example.")]),e("ul",null,[e("li",null,"[x] Timer example")]),e("p",null,"Below the option, it is possible to manually configure some parameters as the standard timer device path, the timeout, the sample rate in which the counter will be read, the number of samples to be executed, and other parameters.")],-1),n('<h2 id="timer-example" tabindex="-1">Timer Example <a class="header-anchor" href="#timer-example" aria-label="Permalink to &quot;Timer Example&quot;">​</a></h2><p>The previously selected example will basically consult the timer status, set a timer alarm interval, set a timer signal handler function to be notified at the alarm, which only increments a variable, and then it will start the timer. The application will periodically consult the timer status at the sample rate previously configured through the <code>menuconfig</code> to follow the time left until the timer expires. After the samples have been read, the application stops the timer.</p><p>The <a href="https://github.com/apache/nuttx-apps/blob/master/examples/timer/timer_main.c" target="_blank" rel="noreferrer">example code</a> may be explored, its path is at <code>/examples/timer/timer_main.c</code> in the apps&#39; repository.</p><p>In NuttX, the timer driver is a character driver and when a chip supports multiple timers, each one is accessible through its respective file in <code>/dev</code> directory. Each timer is registered using a unique numeric identifier (i.e. <code>/dev/timer0</code>, <code>/dev/timer1</code>, ...).</p><p>Use the following command to run the example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>`nsh&gt; timer`</span></span></code></pre></div><p>This command will use the timer 0. To use the others, specify it through a parameter (where x is the timer number):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>`nsh&gt; timer -d /dev/timerx`</span></span></code></pre></div><h2 id="application-level-interface" tabindex="-1">Application Level Interface <a class="header-anchor" href="#application-level-interface" aria-label="Permalink to &quot;Application Level Interface&quot;">​</a></h2><p>The first necessary thing to be done in order to use the timer driver in an application is to include the header file for the NuttX timer driver. It contains the Application Level Interface to the timer driver. To do so, include:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/timers/timer.h&gt;</span></span></code></pre></div><p>At an application level, the timer functionalities may be accessed through <code>ioctl</code> systems calls. The available <code>ioctl</code> commands are:</p>',12),e("blockquote",null,[e("ul",null,[e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_START")]),e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_STOP")]),e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_GETSTATUS")]),e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_SETTIMEOUT")]),e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_NOTIFICATION")]),e("li",null,[s(":c"),e("code",{class:"interpreted-text",role:"macro"},"TCIOC_MAXTIMEOUT")])])],-1),n(`<p>These <code>ioctl</code> commands internally call lower-half layer operations and the parameters are forwarded to these ops through the <code>ioctl</code> system call. The return of a system call is the return of an operation. These <code>struct timer_ops_s</code> keeps pointers to the implementation of each operation. Following is the struct.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct timer_ops_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   /* Required methods *******************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Start the timer, resetting the time to the current timeout */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*start)(FAR struct timer_lowerhalf_s *lower);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Stop the timer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*stop)(FAR struct timer_lowerhalf_s *lower);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Get the current timer status */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*getstatus)(FAR struct timer_lowerhalf_s *lower,</span></span>
<span class="line"><span>                           FAR struct timer_status_s *status);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Set a new timeout value (and reset the timer) */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*settimeout)(FAR struct timer_lowerhalf_s *lower,</span></span>
<span class="line"><span>                           uint32_t timeout);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Call the NuttX INTERNAL timeout callback on timeout.</span></span>
<span class="line"><span>      * NOTE:  Providing callback==NULL disable.</span></span>
<span class="line"><span>      * NOT to call back into applications.</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE void (*setcallback)(FAR struct timer_lowerhalf_s *lower,</span></span>
<span class="line"><span>                              CODE tccb_t callback, FAR void *arg);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Any ioctl commands that are not recognized by the &quot;upper-half&quot; driver</span></span>
<span class="line"><span>      * are forwarded to the lower half driver through this method.</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*ioctl)(FAR struct timer_lowerhalf_s *lower, int cmd,</span></span>
<span class="line"><span>                     unsigned long arg);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Get the maximum supported timeout value */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   CODE int (*maxtimeout)(FAR struct timer_lowerhalf_s *lower,</span></span>
<span class="line"><span>                           FAR uint32_t *maxtimeout);</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Since <code>ioctl</code> system calls expect a file descriptor, before using these commands, it&#39;s necessary to open the timer device special file in order to get a file descriptor. The following snippet demonstrates how to do so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Open the timer device */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Open %s\\n&quot;, devname);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fd = open(devname, O_RDONLY);</span></span>
<span class="line"><span>if (fd &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to open %s: %d\\n&quot;,</span></span>
<span class="line"><span>            devname, errno);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>TCIOC_START</code> command calls the <code>start</code> operation, which is described below.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Start the timer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Start the timer\\n&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_START, 0);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to start the timer: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>TCIOC_STOP</code> command calls the <code>stop</code> operation, which is described below.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Stop the timer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;\\nStop the timer\\n&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_STOP, 0);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to stop the timer: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>TCIOC_GETSTATUS</code> command calls the <code>getstatus</code> operation, which is described below.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Get timer status */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_GETSTATUS, (unsigned long)((uintptr_t)&amp;status));</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to get timer status: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    exit(EXIT_FAILURE);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Print the timer status */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;  flags: %08lx timeout: %lu timeleft: %lu\\n&quot;,</span></span>
<span class="line"><span>       (unsigned long)status.flags, (unsigned long)status.timeout,</span></span>
<span class="line"><span>       (unsigned long)status.timeleft);</span></span></code></pre></div><p>The <code>TCIOC_SETTIMEOUT</code> command calls the <code>settimeout</code> operation, which is described below.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Set the timer interval */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Set timer interval to %lu\\n&quot;,</span></span>
<span class="line"><span>       (unsigned long)CONFIG_EXAMPLES_TIMER_INTERVAL);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_SETTIMEOUT, CONFIG_EXAMPLES_TIMER_INTERVAL);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to set the timer interval: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>TCIOC_NOTIFICATION</code> is used to configure the timer callback to notify the application via a signal when the timer expires. This command calls the <code>setcallback</code> operation. Which will not be described here, since the application does not set a callback directly. Instead, the user should configure a signal handler to catch notifications, and then, configure a timer notifier to notify and to signal the previously configured signal handler. For a better performance, a separate pthread may be configured to wait on sigwaitinfo() for timer events.</p><p>In any case, this command expects a read-only pointer to a struct [timer_notify_s]{.title-ref}. This struct contains 2 fields: <code>pid</code> (<code>pid_t</code>), that indicates the ID of the task/thread to receive the signal and <code>event</code> (<code>struct sigevent</code>), which describes the way a task will be notified.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>printf(&quot;Configure the notification\\n&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>notify.pid   = getpid();</span></span>
<span class="line"><span>notify.event.sigev_notify = SIGEV_SIGNAL;</span></span>
<span class="line"><span>notify.event.sigev_signo  = CONFIG_EXAMPLES_TIMER_SIGNO;</span></span>
<span class="line"><span>notify.event.sigev_value.sival_ptr = NULL;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_NOTIFICATION, (unsigned long)((uintptr_t)&amp;notify));</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to set the timer handler: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>TCIOC_MAXTIMEOUT</code> command calls the <code>maxtimeout</code> operation, which is described below.</p><p>This command may be used like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Get the maximum timer timeout  */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Get the maximum timer timeout\\n&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = ioctl(fd, TCIOC_MAXTIMEOUT, (uint32_t*)(&amp;max_timeout));</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;ERROR: Failed to reat the timer&#39;s maximum timeout: %d\\n&quot;, errno);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Print the maximum supported timeout */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Maximum supported timeout: %&quot; PRIu32 &quot;\\n&quot;, max_timeout);</span></span></code></pre></div><p>Those snippets were taken from the Example which provides a great resource to demonstrate how to use those <code>ioctl</code> commands.</p>`,24)]))}const f=t(l,[["render",o]]);export{g as __pageData,f as default};
