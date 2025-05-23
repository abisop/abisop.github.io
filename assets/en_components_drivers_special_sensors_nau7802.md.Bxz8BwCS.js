import{_ as s,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"NAU7802","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/special/sensors/nau7802.md","filePath":"en/components/drivers/special/sensors/nau7802.md"}'),i={name:"en/components/drivers/special/sensors/nau7802.md"};function t(l,a,o,r,c,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="nau7802" tabindex="-1">NAU7802 <a class="header-anchor" href="#nau7802" aria-label="Permalink to &quot;NAU7802&quot;">​</a></h1><p>Contributed by Daniel Byshkin.</p><p>The Adafruit NAU7802 is a high-resolution 24-bit ADC with an integrated load cell amplifier. It is designed for use with load cells and other sensors that require high precision and low noise measurements. The NAU7802 features a built-in programmable gain amplifier (PGA) that allows for easy calibration and adjustment of the sensor&#39;s output.</p><p>The driver uses the [[uorb](\`uorb.md) &lt;/components/drivers/special/sensors/sensors_uorb&gt;]{.title-ref} interface.</p><h2 id="application-programming-interface" tabindex="-1">Application Programming Interface <a class="header-anchor" href="#application-programming-interface" aria-label="Permalink to &quot;Application Programming Interface&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/sensors/nau7802.h&gt;</span></span></code></pre></div><p>The NAU7802 registration function allows the driver to be registered as a UORB driver. Registering this driver will cause the <code>/dev/uorb/sensor_force&lt;n&gt;</code> topic to appear, where <code>n</code> is the value of <code>devno</code>.</p><p>Registering the device in polling mode will create a kernel thread to poll the sensor</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int err = nau7802_register(i2c_master, 0, 0x2a);</span></span>
<span class="line"><span>if(err &lt; 0){</span></span>
<span class="line"><span>  printf(&quot;Failed to register NAU7802: %d\\n&quot;, err);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The following are available commands for the NAU7802 driver:</p><h3 id="snioc-reset" tabindex="-1"><code>SNIOC_RESET</code> <a class="header-anchor" href="#snioc-reset" aria-label="Permalink to &quot;\`SNIOC_RESET\`&quot;">​</a></h3><p>Performs a reset of all registers on the NAU7802.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>orb_ioctl(sensor, SNIOC_RESET);</span></span></code></pre></div><h3 id="snioc-set-gain" tabindex="-1"><code>SNIOC_SET_GAIN</code> <a class="header-anchor" href="#snioc-set-gain" aria-label="Permalink to &quot;\`SNIOC_SET_GAIN\`&quot;">​</a></h3><p>This command sets the gain of the NAU7802. The possible values are dictated by the <code>nau7802_gain_e</code> enum. The default value is 128x.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>orb_ioctl(sensor, SNIOC_SET_GAIN, NAU7802_GAIN_128);</span></span></code></pre></div><h3 id="snioc-set-interval" tabindex="-1"><code>SNIOC_SET_INTERVAL</code> <a class="header-anchor" href="#snioc-set-interval" aria-label="Permalink to &quot;\`SNIOC_SET_INTERVAL\`&quot;">​</a></h3><p>This commands sets the polling interval of the NAU7802. The possible values are dictated by the <code>nau7802_odr_e</code> enum. The default value is 10HZ.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>orb_ioctl(sensor, SNIOC_SET_INTERVAL, NAU7802_ODR_10HZ);</span></span></code></pre></div><h3 id="snioc-set-ldo" tabindex="-1"><code>SNIOC_SET_LDO</code> <a class="header-anchor" href="#snioc-set-ldo" aria-label="Permalink to &quot;\`SNIOC_SET_LDO\`&quot;">​</a></h3><p>This command sets the LDO voltage of the NAU7802. The possible values are dictated by the <code>nau7802_ldo_e</code> enum. The default value is 3.0V.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>orb_ioctl(sensor, SNIOC_SET_LDO, NAU7802_LDO_3V0);</span></span></code></pre></div><h3 id="snioc-calibrate" tabindex="-1"><code>SNIOC_CALIBRATE</code> <a class="header-anchor" href="#snioc-calibrate" aria-label="Permalink to &quot;\`SNIOC_CALIBRATE\`&quot;">​</a></h3><p>This commands performs one of the calibration procedures of the NAU7802. The possible calibration modes are:</p><blockquote><ul><li>NAU7802_CALMOD_INTERNAL: Removes internal PGA gain and offset errors.</li><li>NAU7802_CALMOD_OFFSET: Calibrates the zero point of the sensor.</li><li>NAU7802_CALMOD_GAIN: Calibrates the max value of the sensor.</li></ul></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>orb_ioctl(sensor, SNIOC_CALIBRATE, NAU7802_CALMOD_INTERNAL);</span></span></code></pre></div><p>For the gain calibration mode the user must place a known weight on the sensor. Unfortunately the NAU7802 records it as the maximum value, thus if your loadcell supports up to 100kg you shall put a 100kg weight on.</p><p>A workaround would be to do a manual calibration by placing a smaller known weight and polling the sensor to get an average point, then using such point to offset the recorded values. An example is provided below.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &quot;stdio.h&quot;</span></span>
<span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/sensors/nau7802.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdbool.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/ioctl.h&gt;</span></span>
<span class="line"><span>#include &lt;uORB/uORB.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int get_data(const struct orb_metadata *imu_meta, int imu, struct sensor_force *data) {</span></span>
<span class="line"><span>  int err = 0;</span></span>
<span class="line"><span>  bool update = false;</span></span>
<span class="line"><span>  err = orb_check(imu, &amp;update);</span></span>
<span class="line"><span>  if (err &lt; 0) {</span></span>
<span class="line"><span>      return err;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  err = orb_copy(imu_meta, imu, data);</span></span>
<span class="line"><span>  if (err &lt; 0) {</span></span>
<span class="line"><span>      return err;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return err;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(int argc, char **argv) {</span></span>
<span class="line"><span>  int err;</span></span>
<span class="line"><span>  int imu;</span></span>
<span class="line"><span>  char *name = &quot;sensor_force0&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const struct orb_metadata *imu_meta = orb_get_meta(name);</span></span>
<span class="line"><span>  if (imu_meta == NULL) {</span></span>
<span class="line"><span>      fprintf(stderr, &quot;Failed to get metadata for %s\\n&quot;, name);</span></span>
<span class="line"><span>      return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  imu = orb_subscribe(imu_meta);</span></span>
<span class="line"><span>  if (imu &lt; 0) {</span></span>
<span class="line"><span>      fprintf(stderr, &quot;Could not subscribe to %s: %d\\n&quot;, name, errno);</span></span>
<span class="line"><span>      return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  struct sensor_force data;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // flush 10 readings</span></span>
<span class="line"><span>  for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>      err = get_data(imu_meta, imu, &amp;data);</span></span>
<span class="line"><span>      if (err &lt; 0) {</span></span>
<span class="line"><span>          printf(&quot;Error reading data\\n&quot;);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      usleep(100000); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  long zero_point = 0;</span></span>
<span class="line"><span>  for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>      err = get_data(imu_meta, imu, &amp;data);</span></span>
<span class="line"><span>      if (err &lt; 0) {</span></span>
<span class="line"><span>          printf(&quot;Error reading data\\n&quot;);</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>          zero_point += data.force / 10;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      usleep(100000); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  printf(&quot;Zero point: %ld\\n&quot;, zero_point);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  printf(&quot;Place weight on the sensor... you have 5 seconds from when you see this message\\n&quot;);</span></span>
<span class="line"><span>  usleep(5000000);</span></span>
<span class="line"><span>  printf(&quot;Starting gain calibration\\n&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  long weight_point = 0;</span></span>
<span class="line"><span>  for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>      err = get_data(imu_meta, imu, &amp;data);</span></span>
<span class="line"><span>      if (err &lt; 0) {</span></span>
<span class="line"><span>          printf(&quot;Error reading data\\n&quot;);</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>          weight_point += data.force / 10;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      usleep(100000);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  printf(&quot;Weight value: %ld\\n&quot;, weight_point);</span></span>
<span class="line"><span>  float known_weight_val = 15000; // 1.5kg</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (true) {</span></span>
<span class="line"><span>      err = get_data(imu_meta, imu, &amp;data);</span></span>
<span class="line"><span>      if (err &lt; 0) {</span></span>
<span class="line"><span>          printf(&quot;Error reading data\\n&quot;);</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>          printf(&quot;Force: %.3f\\n&quot;, known_weight_val * (data.force - zero_point) / (weight_point - zero_point));</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      usleep(50000);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  orb_unsubscribe(imu);</span></span>
<span class="line"><span>  return EXIT_SUCCESS;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="snioc-get-calibvalue" tabindex="-1"><code>SNIOC_GET_CALIBVALUE:</code> <a class="header-anchor" href="#snioc-get-calibvalue" aria-label="Permalink to &quot;\`SNIOC_GET_CALIBVALUE:\`&quot;">​</a></h3><p>This commands gets the gain calibration value when set by the <code>SNIOC_CALIBRATE</code> command.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uint32_t cal_value;</span></span>
<span class="line"><span>orb_ioctl(sensor, SNIOC_GET_CALIBVALUE, (unsigned long)&amp;cal_value);</span></span></code></pre></div><h3 id="snioc-set-calibvalue" tabindex="-1"><code>SNIOC_SET_CALIBVALUE:</code> <a class="header-anchor" href="#snioc-set-calibvalue" aria-label="Permalink to &quot;\`SNIOC_SET_CALIBVALUE:\`&quot;">​</a></h3><p>This commands sets the gain calibration value, useful when you calibrated the sensor with the gain calibration mode once and want to reuse it later on.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uint32_t cal_value;</span></span>
<span class="line"><span>orb_ioctl(sensor, SNIOC_SET_CALIBVALUE, cal_value);</span></span></code></pre></div>`,35)]))}const g=s(i,[["render",t]]);export{h as __pageData,g as default};
