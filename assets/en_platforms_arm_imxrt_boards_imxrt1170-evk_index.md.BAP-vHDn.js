import{_ as a,c as n,al as s,o as t}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"i.MX RT1170 EVK","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/imxrt/boards/imxrt1170-evk/index.md","filePath":"en/platforms/arm/imxrt/boards/imxrt1170-evk/index.md"}'),i={name:"en/platforms/arm/imxrt/boards/imxrt1170-evk/index.md"};function o(r,e,l,p,h,d){return t(),n("div",null,e[0]||(e[0]=[s(`<h1 id="i-mx-rt1170-evk" tabindex="-1">i.MX RT1170 EVK <a class="header-anchor" href="#i-mx-rt1170-evk" aria-label="Permalink to &quot;i.MX RT1170 EVK&quot;">​</a></h1><p><a href="https://www.nxp.com/design/development-boards/i-mx-evaluation-and-development-boards/mimxRT1170-evk-i-mx-RT1170-evaluation-kit:MIMXRT1170-EVK" target="_blank" rel="noreferrer">i.MX RT1170 EVK</a> is an evaluation kit by NXP company. This kit uses the i.MX RT1170 crossover MCU with ARM Cortex M7 core.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li></li></ul><pre><code>Processor

:   -   MIMXRT1176DVMAA processor
    -   1GHz Cortex-M7
    -   400Mhz Cortex-M4
</code></pre><ul><li></li></ul><pre><code>Memory

:   -   2 Mb OCRAM memory
    -   512 Mbit SDRAM memory
    -   512 Mbit Hyper Flash - Populated but 0 ohm DNP
    -   64 Mbit QSPI Flash
    -   TF socket for SD card
</code></pre><ul><li></li></ul><pre><code>Display and Audio

:   -   MIPI LCD connectors
</code></pre><ul><li></li></ul><pre><code>Connectivity

:   -   Micro USB host and OTG connectors
    -   Ethernet (10/100T) connector
    -   Ethernet (10/100/1000T) connector
    -   CAN transceivers
    -   Arduino® interface
</code></pre><ul><li></li></ul><pre><code>Sensors

:   -   FXOS8700CQ 6-Axis Ecompass (3-Axis Mag, 3-Axis Accel)
</code></pre><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>Virtual console port provided by OpenSDA:</p><hr><p>UART1_TXD GPIO_AD_24 LPUART1_TX UART1_RXD GPIO_AD_25 LPUART1_RX</p><hr><p>Arduino RS-232 Shield:</p><hr><p>J22 D0 UART_RX GPIO_DISP_B2_11 LPUART2_RX J22 D1 UART_TX GPIO_DISP_B2_10 LPUART2_TX</p><hr><h2 id="j-link-external-debug-probe" tabindex="-1">J-Link External Debug Probe <a class="header-anchor" href="#j-link-external-debug-probe" aria-label="Permalink to &quot;J-Link External Debug Probe&quot;">​</a></h2><p>Install the J-Link Debug Host Tools and make sure they are in your search path.</p><p>Attach a J-Link 20-pin connector to J1. Check that jumpers J5, J6, J7 and J8 are off (they are on by default when boards ship from the factory) to ensure SWD signals are disconnected from the OpenSDA microcontroller.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is identical to the nsh configuration below except that NuttX is built as a protected mode, monolithic module and the user applications are built separately. It is recommends to use a special make command; not just &#39;make&#39; but make with the following two arguments:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make pass1 pass2</span></span></code></pre></div><p>In the normal case (just &#39;make&#39;), make will attempt to build both user-and kernel-mode blobs more or less interleaved. This actual works! However, for me it is very confusing so I prefer the above make command: Make the user-space binaries first (pass1), then make the kernel-space binaries (pass2)</p><p>NOTES:</p><p>At the end of the build, there will be several files in the top-level NuttX build directory:</p><p>PASS1:</p><p>: - nuttx_user.elf - The pass1 user-space ELF file - nuttx_user.hex - The pass1 Intel HEX format file (selected in defconfig) - User.map - Symbols in the user-space ELF file</p><p>PASS2:</p><p>: - nuttx - The pass2 kernel-space ELF file - nuttx.hex - The pass2 Intel HEX file (selected in defconfig) - System.map - Symbols in the kernel-space ELF file</p><p>The J-Link programmer will accept files in .hex, .mot, .srec, and .bin formats.</p><p>Combining .hex files. If you plan to use the .hex files with your debugger or FLASH utility, then you may need to combine the two hex files into a single .hex file. Here is how you can do that.</p><p>The &#39;tail&#39; of the nuttx.hex file should look something like this (with my comments added beginning with #):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> tail nuttx.hex</span></span>
<span class="line"><span>#xx xxxx 00 data records</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>:10 C93C 00 000000000040184000C2010000000000 90</span></span>
<span class="line"><span>:10 C94C 00 2400080000801B4000C01B4000001C40 5D</span></span>
<span class="line"><span>:10 C95C 00 00401C4000000C4050BF0060FF000100 74</span></span>
<span class="line"><span>#xx xxxx 05 Start Linear Address Record</span></span>
<span class="line"><span>:04 0000 05 6000 02C1 D4</span></span>
<span class="line"><span>#xx xxxx 01 End Of File record</span></span>
<span class="line"><span>:00 0000 01 FF</span></span></code></pre></div><p>Use an editor such as vi to remove the 05 and 01 records.</p><p>The &#39;head&#39; of the nuttx_user.hex file should look something like this (again with my comments added beginning with #):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> head nuttx_user.hex</span></span>
<span class="line"><span>#xx xxxx 04 Extended Linear Address Record</span></span>
<span class="line"><span>:02 0000 04 6020 7A</span></span>
<span class="line"><span>#xx xxxx 00 data records</span></span>
<span class="line"><span>:10 0000 00 8905206030002060F2622060FC622060 80</span></span>
<span class="line"><span>:10 0010 00 0000242008002420080024205C012420 63</span></span>
<span class="line"><span>:10 0020 00 140024203D0020603100206071052060 14</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>Nothing needs to be done here. The nuttx_user.hex file should be fine.</p><p>Combine the edited nuttx.hex and un-edited nuttx_user.hex file to produce a single combined hex file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cat nuttx.hex nuttx_user.hex &gt;combined.hex</span></span></code></pre></div><p>Then use the combined.hex file with the to write the FLASH image. If you do this a lot, you will probably want to invest a little time to develop a tool to automate these steps.</p><p>STATUS: This configuration was added on 8 June 2018 primarily to assure that all of the components are in place to support the PROTECTED mode build. This configuration, however, has not been verified as of this writing.</p><h3 id="netnsh" tabindex="-1">netnsh <a class="header-anchor" href="#netnsh" aria-label="Permalink to &quot;netnsh&quot;">​</a></h3><p>This configuration is similar to the nsh configuration except that is has networking enabled, both IPv4 and IPv6. This NSH configuration is focused on network-related testing.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This NSH configuration is focused on low level, command-line driver testing. Built-in applications are supported, but none are enabled. This configuration does not support a network.</p>`,52)]))}const m=a(i,[["render",o]]);export{u as __pageData,m as default};
