import{_ as t,c as p,al as a,j as n,a as s,o as i}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"MCP3008","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/character/analog/adc/mcp3008/index.md","filePath":"en/components/drivers/character/analog/adc/mcp3008/index.md"}'),o={name:"en/components/drivers/character/analog/adc/mcp3008/index.md"};function r(l,e,c,d,h,u){return i(),p("div",null,e[0]||(e[0]=[a(`<h1 id="mcp3008" tabindex="-1">MCP3008 <a class="header-anchor" href="#mcp3008" aria-label="Permalink to &quot;MCP3008&quot;">​</a></h1><p>Contributed by Matteo Golin</p><p>The MCP3008 is a 10-bit, 8-channel ADC made by Microchip which operates over SPI.</p><p>There is the option to operate in single-ended mode, which measures the voltage on each channel individually, or differential mode which measures the voltage difference between pairs of channels.</p><p>When operating in differential mode, the channel numbers below correspond to the listed differential pairs:</p><hr><p>Channel number Sources 0 CH0+, CH1- 1 CH0-, CH1+ 2 CH2+, CH3- 3 CH2-, CH3+ 4 CH4+, CH5- 5 CH4-, CH5+ 6 CH6+, CH7- 7 CH6-, CH7+</p><hr><p>: Differential pair channel numbers</p><h2 id="driver-interface" tabindex="-1">Driver Interface <a class="header-anchor" href="#driver-interface" aria-label="Permalink to &quot;Driver Interface&quot;">​</a></h2><p>To register the MCP3008 device driver as a standard NuttX analog device on your board, you can use something similar to the below code for the RP2040.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/analog/mcp3008.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/analog/adc.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Register MCP3008 ADC */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct spi_dev_s *spi = rp2040_spibus_initialize(0);</span></span>
<span class="line"><span>if (spi == NULL)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    syslog(LOG_ERR, &quot;Failed to initialize SPI bus 0\\n&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct adc_dev_s *mcp3008 = mcp3008_initialize(spi);</span></span>
<span class="line"><span>if (mcp3008 == NULL)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  syslog(LOG_ERR, &quot;Failed to initialize MCP3008\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int ret = adc_register(&quot;/dev/adc1&quot;, mcp3008);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  syslog(LOG_ERR, &quot;Failed to register MCP3008 device driver: %d\\n&quot;, ret);</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,12),n("p",null,[s("Once registered, this driver can be interacted with using the ADC example ("),n("code",{class:"interpreted-text",role:"ref"},"adc-example"),s("). Be sure to enable the software trigger, since the MCP3008 driver does not support hardware triggers (interrupts). You can also change the number of samples per group up to 8 for all 8 channels of the ADC.")],-1),a(`<p>You may need to increase the [CONFIG_ADC_FIFOSIZE]{.title-ref} value to something larger than 8 in order to be able to store all the ADC measurements after a measurement trigger (i.e 9).</p><p>You can configure the driver in differential mode by default using the [CONFIG_ADC_MCP3008_DIFFERENTIAL]{.title-ref} configuration option.</p><p>You can also configure the speed of SPI communications to the MCP3008 using the [CONFIG_ADC_MCP3008_SPI_FREQUENCY]{.title-ref} configuration option. This speed should be selected based on the supply voltage used to power the MCP3008:</p><p>Supply Voltage Frequency</p><hr><p>VDD &gt;= 4V 3.6MHz VDD &gt;= 3.3V 2.34MHz VDD = 2.7V 1.35MHz</p><p>: SPI frequencies for supply voltage</p><p>If you have a measurement from the MCP3008, you can convert it into a voltage like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define VREF (3.3) /* Whatever voltage is used on the VREF pin */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct adc_msg_s msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Some code here to read the ADC device, you can read the ADC driver docs */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>double voltage = ((double)msg.am_data * VREF) / (1023.0);</span></span></code></pre></div><p>There is also an additional [ioctl()]{.title-ref} command supported for the MCP3008 that permits you to switch from differential to single ended mode at runtime:</p><p>This command changes the mode of the MCP3008 driver. The argument passed should be 0 to disable differential mode (and thus use single-ended mode), and 1 to enable differential mode. No other values are allowed.</p>`,11)]))}const f=t(o,[["render",r]]);export{g as __pageData,f as default};
