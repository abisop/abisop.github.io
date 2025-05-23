import{_ as n,c as a,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"LSM6DSO32","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/special/sensors/lsm6dso32.md","filePath":"en/components/drivers/special/sensors/lsm6dso32.md"}'),t={name:"en/components/drivers/special/sensors/lsm6dso32.md"};function i(o,s,l,r,c,d){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="lsm6dso32" tabindex="-1">LSM6DSO32 <a class="header-anchor" href="#lsm6dso32" aria-label="Permalink to &quot;LSM6DSO32&quot;">​</a></h1><p>The LSM6DSO32 is a high-performance IMU with a 3-axis gyroscope and 3-axis accelerometer by STMicroelectronics. It has both I2C and SPI interfaces, although this driver only supports I2C.</p><p>This driver uses the [[uorb](\`uorb.md) &lt;/components/drivers/special/sensors/sensors_uorb&gt;]{.title-ref} interface. It supports the self-test capability for both the accelerometer and gyroscope.</p><p>Warning</p><p>The LSM6DSO32 is a feature-packed sensor, and this driver does not implement many of its features, such as tap, wakeup, acting as a master to other sensors, etc.</p><h2 id="application-programming-interface" tabindex="-1">Application Programming Interface <a class="header-anchor" href="#application-programming-interface" aria-label="Permalink to &quot;Application Programming Interface&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/sensors/lsm6dso32.h&gt;</span></span></code></pre></div><p>The LSM6DSO32 registration function allows the driver to be registered as a uORB driver. Registering this driver will cause two uORB topics to be registered under <code>/dev/uorb/</code>: <code>sensor_accel&lt;n&gt;</code> and <code>sensor_gyro&lt;n&gt;</code>, where <code>n</code> is the value of <code>devno</code>.</p><p>The driver can be registered either in polling mode or interrupt-driven mode. The polling mode will create a kernel thread to poll the sensor periodically according to the set interval. Polling mode is register by leaving the <code>attach</code> functions <code>NULL</code> in the <code>config</code> parameter.</p><p>Warning</p><p>To use interrupt-driven mode, <code>CONFIG_SCHED_HPWORK</code> must be enabled.</p><p>The following snippet shows how to register the driver in polling mode. The values of <code>gy_int</code> and <code>xl_int</code> can be safely ignored for this mode.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Example for an RP2040 MCU */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> struct lsm6dso32_config_s lsm6dso32_config = {</span></span>
<span class="line"><span>   .gy_int = 0,</span></span>
<span class="line"><span>   .xl_int = 0,</span></span>
<span class="line"><span>   .gy_attach = NULL,</span></span>
<span class="line"><span>   .xl_attach = NULL,</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ret = lsm6dso32_register(rp2040_i2cbus_initialize(0), 0x6b, 0,</span></span>
<span class="line"><span>                          &amp;lsm6dso32_config);</span></span>
<span class="line"><span> if (ret &lt; 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>     syslog(LOG_ERR, &quot;Couldn&#39;t register LSM6DSO32 at 0x6b: %d\\n&quot;, ret);</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>The following snippet shows how to register the driver in interrupt-driven mode. Here, you must specify which interrupt pin is the DRDY signal for the gyroscope interrupt handler, and which interrupt pin is the DRDY signal for the accelerometer interrupt handler.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Example for an RP2040 MCU */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* This function registers the gyroscope interrupt handler and immediately</span></span>
<span class="line"><span> * enables it */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static int board_lsm6dso32_gy_attach(xcpt_t handler, FAR void *arg)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int err;</span></span>
<span class="line"><span>  err = rp2040_gpio_irq_attach(GPIO_GYRO_INT, RP2040_GPIO_INTR_EDGE_HIGH,</span></span>
<span class="line"><span>                               handler, arg);</span></span>
<span class="line"><span>  if (err &lt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      return err;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rp2040_gpio_enable_irq(GPIO_GYRO_INT);</span></span>
<span class="line"><span>  return err;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* This function registers the accelerometer interrupt handler and</span></span>
<span class="line"><span> * immediately enables it */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static int board_lsm6dso32_xl_attach(xcpt_t handler, FAR void *arg)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int err;</span></span>
<span class="line"><span>  err = rp2040_gpio_irq_attach(GPIO_XL_INT, RP2040_GPIO_INTR_EDGE_HIGH,</span></span>
<span class="line"><span>                               handler, arg);</span></span>
<span class="line"><span>  if (err &lt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      return err;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rp2040_gpio_enable_irq(GPIO_XL_INT);</span></span>
<span class="line"><span>  return err;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Registration of the driver */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct lsm6dso32_config_s lsm6dso32_config = {</span></span>
<span class="line"><span> .gy_int = LSM6DSO32_INT1, /* Gyroscope uses INT1 pin */</span></span>
<span class="line"><span> .xl_int = LSM6DSO32_INT2, /* Accelerometer uses INT2 pin */</span></span>
<span class="line"><span> .gy_attach = board_lsm6dso32_gy_attach;</span></span>
<span class="line"><span> .xl_attach = board_lsm6dso32_xl_attach;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = lsm6dso32_register(rp2040_i2cbus_initialize(0), 0x6b, 0,</span></span>
<span class="line"><span>                         &amp;lsm6dso32_config);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    syslog(LOG_ERR, &quot;Couldn&#39;t register LSM6DSO32 at 0x6b: %d\\n&quot;, ret);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>To debug this device, you can include the <code>uorb_listener</code> application in your build with debugging enabled. Running it will show the sensor measurements.</p><p>The selftest feature of this device driver makes self-testing available for both the accelerometer and the gyroscope, based off the information in AN5473 by STMicroelectronics. It thus only performs the positive self-test. The sensor under test depends which topic the self-test was called on: the gyroscope or the accelerometer. The self test for both sensors takes no arguments.</p><p>Warning</p><p>The self-test feature must be performed while the sensor is stationary.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>err = orb_ioctl(gyro, SNIOC_SELFTEST, 0);</span></span>
<span class="line"><span>if (err &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Gyroscope self-test failed: %d\\n&quot;, errno);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>The <code>SNIOC_SET_CALIBVALUE</code> command for this device also varies depending on which sensor topic it was called on.</p><p>For the accelerometer, the argument is an array of 3 floats, representing the X, Y and Z offsets to be subtracted from measurements in meters per second squared, in that order.</p><p>For the gyroscope, the argument is an array of 3 floats, representing the X, Y and Z offsets to be subtracted from measurements in radians per second, in that order.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Accelerometer offset example */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>float offsets[3] = {0.0f, 0.0f, 9.81f};</span></span>
<span class="line"><span>err = orb_ioctl(accel, SNIOC_SET_CALIBVALUE, (unsigned long)(offsets));</span></span></code></pre></div><p>The interface for setting the measurement interval operates individually on the gyroscope and accelerometer. That is to say that they can have different sampling rates.</p><p>Warning</p><p>This driver does not implement the low-power mode sampling for the accelerometer at 1.6Hz, only 12.5Hz and above.</p><p>The temperature measurement including in the data for both the accelerometer and gyroscope is pulled from the same on-board temperature sensor. The output data rate of this temperature sensor is always 52Hz. This only changes if the accelerometer is in low or ultra-low power mode, in which case the temperature ODR matches that of the accelerometer. However, this driver currently does not implement those power modes.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsigned freq = 50;</span></span>
<span class="line"><span>err = orb_set_frequency(accel, freq);</span></span>
<span class="line"><span>if (err)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Wasn&#39;t able to set frequency to %uHz: %d\\n&quot;, freq, err);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>This sensor also has additional commands for gaining access to extra functionality.</p><h3 id="snioc-who-am-i" tabindex="-1"><code>SNIOC_WHO_AM_I</code> <a class="header-anchor" href="#snioc-who-am-i" aria-label="Permalink to &quot;\`SNIOC_WHO_AM_I\`&quot;">​</a></h3><p>This command reads the <code>WHOAMI</code> register of the LSM6DSO32. This should always return [0x6c]{.title-ref}. The argument is a pointer to an 8-bit unsigned integer. This command has the same result when called on either the accelerometer or gyroscope topic.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uint8_t id;</span></span>
<span class="line"><span>err = orb_ioctl(accel, SNIOC_WHO_AM_I, (unsigned long)&amp;id);</span></span></code></pre></div><h3 id="snioc-setfullscale" tabindex="-1"><code>SNIOC_SETFULLSCALE</code> <a class="header-anchor" href="#snioc-setfullscale" aria-label="Permalink to &quot;\`SNIOC_SETFULLSCALE\`&quot;">​</a></h3><p>This command allows the user to set the full scale range of either the accelerometer on the gyroscope.</p><p>When called on the accelerometer, the argument should be the desired FSR in units of &#39;g&#39;. The available options are 4, 8, 16 and 32g.</p><p>When called on the gyroscope, the argument should be the desired FSR in units of degrees per second. The available options are 125, 250, 500, 1000 and 2000 dps.</p><p>Note that by default, the accelerometer has a full scale range of +/-4g and the gyroscope has a full scale range of +/-125dps.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>err = orb_ioctl(accel, SNIOC_SETFULLSCALE, 16);</span></span>
<span class="line"><span>err = orb_ioctl(gyro, SNIOC_SETFULLSCALE, 150);</span></span></code></pre></div><p>To check the FSR, you can get the sensor info and check the <code>max_range</code> field. This value is in m/s^2 for the accelerometer and rad/s for the gyroscope, so it must be converted to units of g or degree per second in order to directly compare it against what was set.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct sensor_device_info_s info;</span></span>
<span class="line"><span>err = orb_ioctl(accel, SNIOC_GET_INFO, (unsigned long)&amp;info);</span></span>
<span class="line"><span>if (err &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Could not get sensor information: %d&quot;, errno);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>printf(&quot;Sensor: %s\\n&quot;, info.name);</span></span>
<span class="line"><span>printf(&quot;Manufacturer: %s\\n&quot;, info.vendor);</span></span>
<span class="line"><span>printf(&quot;Max range: %.2f m/s^2\\n&quot;, info.max_range);</span></span></code></pre></div>`,41)]))}const g=n(t,[["render",i]]);export{u as __pageData,g as default};
