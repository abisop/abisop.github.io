import{_ as t,c as o,al as i,o as r}from"./chunks/framework.NFAqBSgQ.js";const x=JSON.parse('{"title":"VexRISCV_SMP Core","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/litex/cores/vexriscv_smp/index.md","filePath":"en/platforms/risc-v/litex/cores/vexriscv_smp/index.md"}'),n={name:"en/platforms/risc-v/litex/cores/vexriscv_smp/index.md"};function a(s,e,p,c,d,l){return r(),o("div",null,e[0]||(e[0]=[i(`<h1 id="vexriscv-smp-core" tabindex="-1">VexRISCV_SMP Core <a class="header-anchor" href="#vexriscv-smp-core" aria-label="Permalink to &quot;VexRISCV\\_SMP Core&quot;">​</a></h1><p>The vexrisc_smp core supports a two-pass build, producing the kernel (nuttx.bin), and a number of applications, compiled into the apps/bin directory. In the standard configuration, the applications are loaded to the FPGA in a RAMdisk. Although, for custom boards this could be extended to loading from SDCards, flash, or other mediums.</p><h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2><p>Nuttx uses openSBI to configure and prepare the vexriscv_smp core. With this configuration, the Nuttx kernel is a binary payload for OpenSBI. The configuration used is identical to that used for Linux on Litex project (<a href="https://github.com/litex-hub/linux-on-litex-vexriscv" target="_blank" rel="noreferrer">https://github.com/litex-hub/linux-on-litex-vexriscv</a>).</p><p>To build OpenSBI:</p><pre><code> git clone https://github.com/litex-hub/opensbi --branch 0.8-linux-on-litex-vexriscv
 cd opensbi
 make CROSS_COMPILE=riscv64-unknown-elf- PLATFORM=litex/vexriscv
 cp build/platform/litex/vexriscv/firmware/fw_jump.bin ../opensbi.bin&quot;
</code></pre><p>Build the Nuttx kernel:</p><pre><code> ./tools/configure.sh arty_a7:knsh
 make
</code></pre><p>Build the loadable applications:</p><pre><code> make export -j16
 cd ../apps
 make ./tools/mkimport.sh -z -x ../nuttx/nuttx-export-*.tar.gz
 make import
</code></pre><p>Generate a romfs to be loaded to the FPGA as a ramdisk:</p><pre><code> cd nuttx
 genromfs -f romfs.img -d ../apps/bin -V &quot;NuttXBootVol&quot;
</code></pre><h2 id="booting" tabindex="-1">Booting <a class="header-anchor" href="#booting" aria-label="Permalink to &quot;Booting&quot;">​</a></h2><p>Create a file, &#39;boot.json&#39; in the Nuttx root directory, with the following content:</p><pre><code>{
  &quot;romfs.img&quot;:   &quot;0x40C00000&quot;,
  &quot;nuttx.bin&quot;:   &quot;0x40000000&quot;,
  &quot;board.dtb&quot;:   &quot;0x41ec0000&quot;,
  &quot;opensbi.bin&quot;: &quot;0x40f00000&quot;
}
</code></pre><p>Load the application over serial with:</p><pre><code>litex_term --images=boot.json --speed=1e6 /dev/ttyUSB0
</code></pre><p>Update the baud rate and serial port to suit your configuration.</p>`,18)]))}const h=t(n,[["render",a]]);export{x as __pageData,h as default};
