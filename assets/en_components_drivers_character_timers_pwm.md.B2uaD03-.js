import{_ as t,c as p,al as s,j as e,a,o as i}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"PWM Drivers","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/character/timers/pwm.md","filePath":"en/components/drivers/character/timers/pwm.md"}'),o={name:"en/components/drivers/character/timers/pwm.md"};function l(c,n,r,d,u,h){return i(),p("div",null,n[0]||(n[0]=[s('<h1 id="pwm-drivers" tabindex="-1">PWM Drivers <a class="header-anchor" href="#pwm-drivers" aria-label="Permalink to &quot;PWM Drivers&quot;">​</a></h1><p>For the purposes of this driver, a PWM device is any device that generates periodic output pulses of controlled frequency and pulse width. Such a device might be used, for example, to perform pulse-width modulated output or frequency/pulse-count modulated output (such as might be needed to control a stepper motor).</p><p>The NuttX PWM driver is split into two parts:</p><ol><li>An &quot;upper half&quot;, generic driver that provides the common PWM interface to application level code, and</li><li>A &quot;lower half&quot;, platform-specific driver that implements the low-level timer controls to implement the PWM functionality.</li></ol><p>Files supporting PWM can be found in the following locations:</p><ul><li><strong>Interface Definition</strong>. The header file for the NuttX PWM driver reside at <code>include/nuttx/timers/pwm.h</code>. This header file includes both the application level interface to the PWM driver as well as the interface between the &quot;upper half&quot; and &quot;lower half&quot; drivers. The PWM module uses a standard character driver framework. However, since the PWM driver is a device control interface and not a data transfer interface, the majority of the functionality available to the application is implemented in driver ioctl calls.</li><li><strong>&quot;Upper Half&quot; Driver</strong>. The generic, &quot;upper half&quot; PWM driver resides at <code>drivers/timers/pwm.c</code>.</li><li><strong>&quot;Lower Half&quot; Drivers</strong>. Platform-specific PWM drivers reside in <code>arch/&lt;architecture&gt;/src/&lt;hardware&gt;</code> directory for the specific processor <code>&lt;architecture&gt;</code> and for the specific <code>&lt;chip&gt;</code> PWM peripheral devices.</li></ul><h2 id="application-level-interface" tabindex="-1">Application Level Interface <a class="header-anchor" href="#application-level-interface" aria-label="Permalink to &quot;Application Level Interface&quot;">​</a></h2><p>The first necessary thing to be done in order to use the PWM driver in an application is to include the header file for the NuttX timer driver. It contains the Application Level Interface to the PWM driver. To do so, include:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/timers/pwm.h&gt;</span></span></code></pre></div><p>PWM driver is registered as a POSIX character device file into <code>/dev</code> namespace. It is necessary to open the device to get a file descriptor for further operations.</p><p>The PWM is accessed only through <code>ioctl</code> interface, functions <code>read</code> and <code>write</code> does not have any affect. Following <code>ioctl</code> commands are available:</p>',11),e("blockquote",null,[e("ul",null,[e("li",null,[a(":c"),e("code",{class:"interpreted-text",role:"macro"},"PWMIOC_SETCHARACTERISTICS")]),e("li",null,[a(":c"),e("code",{class:"interpreted-text",role:"macro"},"PWMIOC_GETCHARACTERISTICS")]),e("li",null,[a(":c"),e("code",{class:"interpreted-text",role:"macro"},"PWMIOC_START")]),e("li",null,[a(":c"),e("code",{class:"interpreted-text",role:"macro"},"PWMIOC_STOP")])])],-1),s(`<p>The <code>PWMIOC_SETCHARACTERISTICS</code> command sets PWM characteristics such as frequency, duty cycle, dead times and so on. These characteristics are set through <code>pwm_info_s</code> structure.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct pwm_info_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   /* Frequency of the pulse train */</span></span>
<span class="line"><span>   uint32_t           frequency;</span></span>
<span class="line"><span>#ifdef CONFIG_PWM_MULTICHAN</span></span>
<span class="line"><span>   /* Per-channel output state */</span></span>
<span class="line"><span>   struct pwm_chan_s  channels[CONFIG_PWM_NCHANNELS];</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>   /* Duty of the pulse train, &quot;1&quot;-to-&quot;0&quot; duration.</span></span>
<span class="line"><span>    * Maximum: 65535/65536 (0x0000ffff)</span></span>
<span class="line"><span>    * Minimum:     1/65536 (0x00000001)</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>   ub16_t             duty;</span></span>
<span class="line"><span>#ifdef CONFIG_PWM_DEADTIME</span></span>
<span class="line"><span>   /* Dead time value for main output */</span></span>
<span class="line"><span>   ub16_t             dead_time_a;</span></span>
<span class="line"><span>   /* Dead time value for complementary output */</span></span>
<span class="line"><span>   ub16_t             dead_time_b;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>#ifdef CONFIG_PWM_PULSECOUNT</span></span>
<span class="line"><span>   /* The number of pulse to generate.  0 means to</span></span>
<span class="line"><span>    * generate an indefinite number of pulses</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>   uint32_t           count;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>   /* Channel polarity */</span></span>
<span class="line"><span>   uint8_t            cpol;</span></span>
<span class="line"><span>   /* Disabled channel polarity */</span></span>
<span class="line"><span>   uint8_t            dcpol;</span></span>
<span class="line"><span>#endif /* CONFIG_PWM_MULTICHAN */</span></span>
<span class="line"><span>   /* User provided argument to be used in the lower half */</span></span>
<span class="line"><span>   FAR void           *arg;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Structure <code>pwm_chan_s</code> holds the representation of one PWM channel if multiple channels are used ( <code>CONFIG_PWM_MULTICHAN</code> is set).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct pwm_chan_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   /* Duty of the pulse train, &quot;1&quot;-to-&quot;0&quot; duration.</span></span>
<span class="line"><span>    * Maximum: 65535/65536 (0x0000ffff)</span></span>
<span class="line"><span>    * Minimum:     1/65536 (0x00000001)</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>   ub16_t duty;</span></span>
<span class="line"><span>#ifdef CONFIG_PWM_OVERWRITE</span></span>
<span class="line"><span>   /* Channel overwrite */</span></span>
<span class="line"><span>   bool ch_outp_ovrwr;</span></span>
<span class="line"><span>   /* Channel overwrite value */</span></span>
<span class="line"><span>   bool ch_outp_ovrwr_val;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>#ifdef CONFIG_PWM_DEADTIME</span></span>
<span class="line"><span>   /* Dead time value for main output */</span></span>
<span class="line"><span>   ub16_t dead_time_a;</span></span>
<span class="line"><span>   /* Dead time value for complementary output */</span></span>
<span class="line"><span>   ub16_t dead_time_b;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>   /* Channel polarity */</span></span>
<span class="line"><span>   uint8_t cpol;</span></span>
<span class="line"><span>   /* Disabled channel polarity */</span></span>
<span class="line"><span>   uint8_t dcpol;</span></span>
<span class="line"><span>   /* Channel number */</span></span>
<span class="line"><span>   int8_t channel;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Apart from duty cycle and frequency, the <code>ioctl</code> command allows to set many other PWM characteristics. These functionalities might not be supported by all PWM controllers and user should always refer to target documentation in this case.</p><p>If <code>CONFIG_PWM_OVERWRITE</code> is set and <code>ch_outp_ovrwr</code> is true, it is possible to overwrite channel output with value set in <code>ch_outp_ovrwr_val</code>. Configuration option <code>CONFIG_PWM_DEADTIME</code> and fields <code>dead_time_a</code> and <code>dead_time_b</code> provides an option to set dead time between complementary outputs. This instructs the driver to automatically insert output activation delay for complementary PWM outputs and is useful for H-bridge motor control for example.</p><p>User may also set default channel polarity <code>cpol</code> and disabled channel polarity <code>dcpol</code>. If set to zero, default controller values (or values determined in the configuration) are used. Following defines can be used to set the polarities:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Not defined, the default output state is arch dependent */</span></span>
<span class="line"><span>#define PWM_CPOL_NDEF             0</span></span>
<span class="line"><span>/* Logical zero */</span></span>
<span class="line"><span>#define PWM_CPOL_LOW              1</span></span>
<span class="line"><span>/* Logical one */</span></span>
<span class="line"><span>#define PWM_CPOL_HIGH             2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Not defined, the default output state is arch dependent */</span></span>
<span class="line"><span>#define PWM_DCPOL_NDEF            0</span></span>
<span class="line"><span> /* Logical zero */</span></span>
<span class="line"><span>#define PWM_DCPOL_LOW             1</span></span>
<span class="line"><span> /* Logical one  */</span></span>
<span class="line"><span>#define PWM_DCPOL_HIGH            2</span></span></code></pre></div><p>Command <code>PWMIOC_GETCHARACTERISTICS</code> operates the same way as <code>PWMIOC_SETCHARACTERISTICS</code> but it obtains currently set values instead of setting them.</p><p>The <code>PWMIOC_START</code> command starts the pulsed output. Characteristics of PWM channels should be set before this operation.</p><p>The <code>PWMIOC_STOPS</code> command stops the pulsed output.</p><p>The <code>PWMIOC_FAULTS_FETCH_AND_CLEAR</code> command clears fault inputs. Some faults can be latched (remain active even if the source is not active anymore) and have to be cleared from the software. This provides an option to clear faults from the application and re-enable PWM output. It can be also used to fetch the current faults.</p><p>The call takes a pointer to <code>unsigned long</code> variable as an argument, a bitmask defining which faults are to be cleared. The driver clears these faults and fills the argument with the active faults prior to this clear. Having the argument variable equal to zero will result in no faults cleared but the user will get the currently active faults. If NULL is passed as an argument, then all currently set faults are cleared and fetch is not performed.</p><p>This may not be supported by all drivers.</p><h3 id="application-example" tabindex="-1">Application Example <a class="header-anchor" href="#application-example" aria-label="Permalink to &quot;Application Example&quot;">​</a></h3><p>An example application can be found in <code>nuttx-apps</code> repository under the path <code>examples/pwm</code>.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>This section describes common PWM configuration in <code>Kconfig</code>. The reader should refer to target documentation for target specific configuration.</p><p>PWM is enabled by <code>CONFIG_PWM</code> configuration option. Option <code>CONFIG_PWM_MULTICHAN</code> selects support for multiple channels for one PWM instance. If multiple channels are used, configuration option <code>CONFIG_PWM_NCHANNELS</code> defines the maximum number of channels per instance. Each timer/controller may support fewer output channels than this value.</p><p>Generation of pin overwrite is enabled by <code>CONFIG_PWM_OVERWRITE</code> option. This supports generation of a pin overwrite with 0 or 1 without the need to wait for an end of cycle.</p><p>The <code>CONFIG_PWM_DEADTIME</code> option brings the possibility to introduce dead time values between complementary PWM outputs.</p>`,21)]))}const _=t(o,[["render",l]]);export{m as __pageData,_ as default};
