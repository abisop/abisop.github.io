import{_ as n,c as s,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const _=JSON.parse('{"title":"Microchip MCP4706/4716/4726","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/character/analog/dac/mcp47x6/index.md","filePath":"en/components/drivers/character/analog/dac/mcp47x6/index.md"}'),c={name:"en/components/drivers/character/analog/dac/mcp47x6/index.md"};function l(i,a,t,o,d,r){return p(),s("div",null,a[0]||(a[0]=[e(`<h1 id="microchip-mcp4706-4716-4726" tabindex="-1">Microchip MCP4706/4716/4726 <a class="header-anchor" href="#microchip-mcp4706-4716-4726" aria-label="Permalink to &quot;Microchip MCP4706/4716/4726&quot;">​</a></h1><p>Microchip MCP4706/4716/4726 DAC.</p><p>The digital-analog-converter operates over I2C.</p><ul><li><code>include/nuttx/analog/mcp47x6.h</code>. All structures and APIs needed to work with DAC drivers are provided in this header file.</li></ul><p>The following features are configurable via the <code>ioctl</code> interface of the device:</p><ul><li>gain</li><li>power down</li><li>voltage reference</li></ul><h2 id="usage-example" tabindex="-1">Usage Example <a class="header-anchor" href="#usage-example" aria-label="Permalink to &quot;Usage Example&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/analog/dac.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/analog/mcp47x6.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct dac_dev_s *dac;</span></span>
<span class="line"><span>unsigned int const i2c_bus = 0;</span></span>
<span class="line"><span>unsigned int const i2c_address = 0x63;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* create and register device */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dac = mcp47x6_initialize(i2c_bus, i2c_address);</span></span>
<span class="line"><span>dac_register(&quot;/dev/dac0&quot;, dac);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* configure the DAC */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int fd = open(&quot;/dev/dac0&quot;, O_WRONLY | O_NONBLOCK);</span></span>
<span class="line"><span>ioctl(fd, ANIOC_MCP47X6_DAC_SET_REFERENCE, MCP47X6_REFERENCE_VREF_BUFFERED);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* set DAC output value */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct dac_msg_s dac_message = {</span></span>
<span class="line"><span>  .am_channel = 0,</span></span>
<span class="line"><span>  .am_data = 1234</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>write(fd, &amp;dac_message, sizeof(dac_message));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* clean up */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>close(fd);</span></span></code></pre></div>`,8)]))}const h=n(c,[["render",l]]);export{_ as __pageData,h as default};
