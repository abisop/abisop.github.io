import{_ as a,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"drivers/regmap","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/special/regmap.md","filePath":"en/components/drivers/special/regmap.md"}'),i={name:"en/components/drivers/special/regmap.md"};function t(l,s,r,c,d,g){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="drivers-regmap" tabindex="-1">drivers/regmap <a class="header-anchor" href="#drivers-regmap" aria-label="Permalink to &quot;drivers/regmap&quot;">​</a></h1><p>This is the documentation page for the drivers/regmap/.</p><h2 id="regmap-header-files" tabindex="-1">Regmap Header files <a class="header-anchor" href="#regmap-header-files" aria-label="Permalink to &quot;Regmap Header files&quot;">​</a></h2><ul><li><p><code>include/nuttx/regmap/regmap.h</code></p><p>The structures and APIS used in regimap are in this header file.</p></li><li><p><code>struct regmap_bus_s</code></p><p>Each bus must implement an instance of struct regmap_bus_s. That structure defines a call table with the following methods:</p><blockquote><ul><li><p>Single byte reading of the register (8bits)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef CODE int (*reg_read_t)(FAR struct regmap_bus_s *bus,</span></span>
<span class="line"><span>                               unsigned int reg,</span></span>
<span class="line"><span>                               FAR void *val);</span></span></code></pre></div></li><li><p>Single byte writing of the register (8bits)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef CODE int (*reg_write_t)(FAR struct regmap_bus_s *bus,</span></span>
<span class="line"><span>                                unsigned int reg,</span></span>
<span class="line"><span>                                unsigned int val);</span></span></code></pre></div></li><li><p>Bulk register data reading.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef CODE int (*read_t)(FAR struct regmap_bus_s *bus,</span></span>
<span class="line"><span>                          FAR const void *reg_buf, unsigned int reg_size,</span></span>
<span class="line"><span>                          FAR void *val_buf, unsigned int val_size);</span></span></code></pre></div></li><li><p>Bulk register data writing.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef CODE int (*write_t)(FAR struct regmap_bus_s *bus,</span></span>
<span class="line"><span>                            FAR const void *data,</span></span>
<span class="line"><span>                            unsigned int count);</span></span></code></pre></div></li><li><p>Initialize the internal configuration of regmap. The first parameter must be the handle of the bus, and the second parameter is the configuration parameter of the bus. Finally, these two parameters will be transparent to the corresponding bus. If you want to implement the bus interface by yourself, you need to realize the corresponding bus initialization function, refer to regimap_i2c.c and regmap_spi.c.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FAR struct regmap_s *regmap_init(FAR struct regmap_bus_s *bus,</span></span>
<span class="line"><span>                            FAR const struct regmap_config_s *config);</span></span></code></pre></div></li><li><p>Regmap init i2c bus.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FAR struct regmap_s *regmap_init_i2c(FAR struct i2c_master_s *i2c,</span></span>
<span class="line"><span>                                     FAR struct i2c_config_s *i2c_config,</span></span>
<span class="line"><span>                                     FAR const struct regmap_config_s *config);</span></span></code></pre></div></li><li><p>regmap init spi bus.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FAR struct regmap_s *regmap_init_spi(FAR struct spi_dev_s *spi, uint32_t freq,</span></span>
<span class="line"><span>                                     uint32_t devid, enum spi_mode_e mode,</span></span>
<span class="line"><span>                                     FAR const struct regmap_config_s *config);</span></span></code></pre></div></li><li><p>Exit and destroy regmap</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void regmap_exit(FAR struct regmap_s *map);</span></span></code></pre></div></li><li><p>Regmap write() bulk_write() read() bulk_read(), called after initializing the regmap bus device. the first parameter is regmap_s pointer.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int regmap_write(FAR struct regmap_s *map, unsigned int reg,</span></span>
<span class="line"><span>                 unsigned int val);</span></span>
<span class="line"><span>int regmap_bulk_write(FAR struct regmap_s *map, unsigned int reg,</span></span>
<span class="line"><span>                      FAR const void *val, unsigned int val_count);</span></span>
<span class="line"><span>int regmap_read(FAR struct regmap_s *map, unsigned int reg,</span></span>
<span class="line"><span>                FAR void *val);</span></span>
<span class="line"><span>int regmap_bulk_read(FAR struct regmap_s *map, unsigned int reg,</span></span>
<span class="line"><span>                     FAR void *val, unsigned int val_count);</span></span></code></pre></div></li></ul></blockquote></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p>BMI160 sensor as an example: - Head file</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nuttx/i2c/i2c_master.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/sensors/bmi160.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/regmap/regmap.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span></code></pre></div><ul><li>Define the regmap_s handle in the driver&#39;s life cycle</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct bmi160_dev_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>#ifdef CONFIG_SENSORS_BMI160_I2C</span></span>
<span class="line"><span>FAR struct regmap_s * regmap;     /* Regmap interface */</span></span>
<span class="line"><span>#else /* CONFIG_SENSORS_BMI160_SPI */</span></span>
<span class="line"><span>FAR struct spi_dev_s *spi;       /* SPI interface */</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>};</span></span></code></pre></div><ul><li>Initialize regmap</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int bmi160_i2c_regmap_init(FAR struct bmi160_dev_s *priv,</span></span>
<span class="line"><span>                           FAR struct i2c_master_s *i2c)</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>   struct regmap_config_s config;</span></span>
<span class="line"><span>   struct i2c_config_s dev_config;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   config.reg_bits = 8;</span></span>
<span class="line"><span>   config.val_bits = 8;</span></span>
<span class="line"><span>   config.disable_locking = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   dev_config.frequency = BMI160_I2C_FREQ;</span></span>
<span class="line"><span>   dev_config.address   = BMI160_I2C_ADDR;</span></span>
<span class="line"><span>   dev_config.addrlen   = 7;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   priv-&gt;regmap = regmap_init_i2c(i2c, &amp;dev_config, &amp;config);</span></span>
<span class="line"><span>   if (priv-&gt;regmap == NULL)</span></span>
<span class="line"><span>     {</span></span>
<span class="line"><span>       snerr(&quot;bmi160 Initialize regmap configuration failed!&quot;);</span></span>
<span class="line"><span>       return -ENXIO;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return OK;</span></span>
<span class="line"><span> }</span></span></code></pre></div><ul><li>Use:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = regmap_read(priv-&gt;regmap, regaddr, &amp;regval);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    snerr(&quot;regmap read address[%2X] failed: %d!\\n&quot;, regaddr, ret);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = regmap_write(priv-&gt;regmap, regaddr, regval);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    snerr(&quot;regmap write address[%2X] failed: %d!\\n&quot;, regaddr, ret);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = regmap_bulk_read(priv-&gt;regmap, regaddr, regval, len);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    snerr(&quot;regmap read bulk address[%2X] failed: %d!\\n&quot;, regaddr, ret);</span></span>
<span class="line"><span>  }</span></span></code></pre></div>`,13)]))}const m=a(i,[["render",t]]);export{u as __pageData,m as default};
