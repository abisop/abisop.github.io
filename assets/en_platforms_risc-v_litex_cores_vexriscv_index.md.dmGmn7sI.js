import{_ as t,c as o,al as r,o as i}from"./chunks/framework.NFAqBSgQ.js";const x=JSON.parse('{"title":"Vexriscv Core","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/litex/cores/vexriscv/index.md","filePath":"en/platforms/risc-v/litex/cores/vexriscv/index.md"}'),a={name:"en/platforms/risc-v/litex/cores/vexriscv/index.md"};function n(s,e,c,d,l,p){return i(),o("div",null,e[0]||(e[0]=[r(`<h1 id="vexriscv-core" tabindex="-1">Vexriscv Core <a class="header-anchor" href="#vexriscv-core" aria-label="Permalink to &quot;Vexriscv Core&quot;">​</a></h1><p>The vexriscv core only supports standard &quot;Flat builds&quot;, consisting of a single binary.</p><h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2><p>Build the minimal NSH application:</p><pre><code># Configure for NSH
 ./tools/configure.sh arty_a7:nsh

# Build Nuttx
 make
</code></pre><h2 id="booting" tabindex="-1">Booting <a class="header-anchor" href="#booting" aria-label="Permalink to &quot;Booting&quot;">​</a></h2><p>Create a file, &#39;boot.json&#39; in the Nuttx root directory, with the following content:</p><pre><code>{
  &quot;nuttx.bin&quot;: &quot;0x40000000&quot;,
  &quot;board.dtb&quot;: &quot;0x41ec0000&quot;
}
</code></pre><p>Load the application over serial with:</p><pre><code> litex_term --images=boot.json --speed=1e6 /dev/ttyUSB0
</code></pre><p>Update the baud rate and serial port to suit your configuration.</p>`,11)]))}const h=t(a,[["render",n]]);export{x as __pageData,h as default};
