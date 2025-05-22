import{_ as r,c as t,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const b=JSON.parse('{"title":"Bouffalo Lab BL808","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/bl808/index.md","filePath":"en/platforms/risc-v/bl808/index.md"}'),n={name:"en/platforms/risc-v/bl808/index.md"};function i(l,e,s,p,d,u){return o(),t("div",null,e[0]||(e[0]=[a(`<h1 id="bouffalo-lab-bl808" tabindex="-1">Bouffalo Lab BL808 <a class="header-anchor" href="#bouffalo-lab-bl808" aria-label="Permalink to &quot;Bouffalo Lab BL808&quot;">​</a></h1><p><a href="https://github.com/bouffalolab/bl_docs/tree/main/BL808_RM/en" target="_blank" rel="noreferrer">Bouffalo Lab BL808</a> is a 64-bit / 32-bit RISC-V SoC with 3 RISC-V Cores:</p><ul><li></li></ul><pre><code>**D0 Multimedia Core:** T-Head C906 480 MHz 64-bit RISC-V CPU

:   -   RV64IMAFCV
    -   Level 1 Instruction and Data Cache (Harvard architecture)
    -   Sv39 Memory Management Unit
    -   jTLB (128 entries)
    -   AXI 4.0 128-bit master interface
    -   Core Local Interrupt (CLINT) and Platform-Level Interrupt
        Controller (PLIC)
    -   80 External Interrupt Sources
    -   BHT (8K) and BTB
    -   RISC-V PMP (8 configurable areas)
</code></pre><ul><li></li></ul><pre><code>**M0 Wireless Core:** T-Head E907 320 MHz 32-bit RISC-V CPU

:   -   RV32IMAFCP
    -   32-bit / 16-bit Mixed Instruction Set
    -   RISC-V Machine Mode and User Mode
    -   32 x 32-bit Integer General Purpose Registers (GPR)
    -   32 x 32-bit / 64-bit Floating-Point GPRs
    -   AXI 4.0 main device interface and AHB 5.0 peripheral
        interface
    -   Instruction and Data Cache
</code></pre><ul><li></li></ul><pre><code>**LP Low Power Core:** T-Head E902 150 MHz 32-bit RISC-V CPU

:   -   RV32E\\[M\\]C
</code></pre><ul><li><p><strong>RAM:</strong> Embedded 64 MB PSRAM</p></li><li><p><strong>Wireless:</strong> 2.4 GHz 1T1R WiFi 802.11 b/g/n, Bluetooth 5.2, Zigbee</p></li><li><p><strong>Ethernet:</strong> 10 / 100 Mbps</p></li><li><p><strong>USB:</strong> USB 2.0 OTG</p></li><li><p><strong>Audio:</strong> Microphone and Speaker</p></li><li><p><strong>Video Input:</strong> Dual-lane MIPI CSI</p></li><li><p><strong>Peripherals:</strong> UART, SPI, I2C, PWM, SDH, EMAC, USB</p></li></ul><h2 id="peripheral-support" tabindex="-1">Peripheral Support <a class="header-anchor" href="#peripheral-support" aria-label="Permalink to &quot;Peripheral Support&quot;">​</a></h2><p>The following list indicates the state of peripherals&#39; support in NuttX:</p><p>+-----------------------------+-----------------------------+-------+ | Peripheral | Support | NOTES | +=============================+=============================+=======+ | GPDAC DMA EMAC GPADC GPIO | &gt; No No No Yes Yes Yes No | | | I2C I2S PWM SPI Timers UART | &gt; No Yes Yes Yes No Yes | | | USB Watchdogs | | | +-----------------------------+-----------------------------+-------+</p><h2 id="supported-boards" tabindex="-1">Supported Boards <a class="header-anchor" href="#supported-boards" aria-label="Permalink to &quot;Supported Boards&quot;">​</a></h2><blockquote><p>boards/<em>/</em></p></blockquote>`,14)]))}const h=r(n,[["render",i]]);export{b as __pageData,h as default};
