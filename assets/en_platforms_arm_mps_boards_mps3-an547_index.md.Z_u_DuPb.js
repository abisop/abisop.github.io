import{_ as n,c as a,al as o,o as t}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"MPS3 AN547 Board","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/mps/boards/mps3-an547/index.md","filePath":"en/platforms/arm/mps/boards/mps3-an547/index.md"}'),i={name:"en/platforms/arm/mps/boards/mps3-an547/index.md"};function r(s,e,d,l,p,m){return t(),a("div",null,e[0]||(e[0]=[o(`<h1 id="mps3-an547-board" tabindex="-1">MPS3 AN547 Board <a class="header-anchor" href="#mps3-an547-board" aria-label="Permalink to &quot;MPS3 AN547 Board&quot;">​</a></h1><p>The MPS3 AN547 board configuration uses QEMU to emulate a generic ARM v8-M series hardware platform and provides support for the following devices:</p><blockquote><ul><li>ARM Generic Timer</li><li>CMSDK UART controller</li></ul></blockquote><h2 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h2><h3 id="configuring-and-running-single-core" tabindex="-1">Configuring and Running (Single Core) <a class="header-anchor" href="#configuring-and-running-single-core" aria-label="Permalink to &quot;Configuring and Running (Single Core)&quot;">​</a></h3><ol><li><p>Configuring NuttX and Compiling:</p><pre><code>./tools/configure.sh -l mps3-an547:nsh
make
</code></pre></li><li><p>Running with QEMU:</p><pre><code> qemu-system-arm -M mps3-an547 -nographic -kernel nuttx.bin
</code></pre></li><li><p>Pic ostest:</p><pre><code>./tools/configure.sh mps3-an547:picostest
make -j20
genromfs -f romfs.img -d ../apps/bin/
qemu-system-arm -M mps3-an547 -m 2G -nographic \\
-kernel nuttx.bin -gdb tcp::1127 \\
-device loader,file=romfs.img,addr=0x60000000
nsh&gt; /pic/hello
nsh&gt; /pic/ostest
</code></pre></li><li><p>Pic bootloader boot to ap, and run ostest:</p><pre><code>./tools/configure.sh mps3-an547:ap
make -j20
mkdir -p pic
arm-none-eabi-strip --remove-section=.rel.text --remove-section=.comment --strip-unneeded nuttx -o pic/boot
genromfs -a 128 -f ../romfs.img -d pic
make distclean -j20
./tools/configure.sh mps3-an547:bl
make -j20
qemu-system-arm -M mps3-an547 -m 2G -nographic \\
-kernel nuttx.bin -gdb tcp::1127 \\
-device loader,file=../romfs.img,addr=0x60000000
bl&gt; boot /pic/boot
modlib_init...
modlib_load...
modlib_bind...
add-symbol-file ap.elf -s .text 0x60001080 -s .data 0x21000000

ap&gt; ostest
</code></pre></li></ol><h2 id="precautions" tabindex="-1">Precautions <a class="header-anchor" href="#precautions" aria-label="Permalink to &quot;Precautions&quot;">​</a></h2><p>In the new version of QEMU (9.20), the UART RX interrupt and TX interrupt have been swapped. Adjustments need to be made using menuconfig:</p><pre><code>CONFIG_CMSDK_UART0_TX_IRQ=50
CONFIG_CMSDK_UART0_RX_IRQ=49
</code></pre><p>For details, see <a href="https://github.com/qemu/qemu/commit/5a558be93ad628e5bed6e0ee062870f49251725c" target="_blank" rel="noreferrer">fix RX/TX interrupts order</a></p><h2 id="debugging-with-qemu" tabindex="-1">Debugging with QEMU <a class="header-anchor" href="#debugging-with-qemu" aria-label="Permalink to &quot;Debugging with QEMU&quot;">​</a></h2><p>The NuttX ELF image can be debugged using QEMU.</p><ol><li><p>Enable Debug Symbols. Ensure the following change is applied to <code>defconfig</code>:</p><pre><code>CONFIG_DEBUG_SYMBOLS=y
</code></pre></li><li><p>Run QEMU:</p><pre><code>qemu-system-arm -M mps3-an547 -nographic -kernel nuttx.bin -S -s
</code></pre></li><li><p>Run GDB with TUI:</p><pre><code>arm-none-eabi-gdb -tui --eval-command=&#39;target remote localhost:1234&#39; nuttx
</code></pre></li></ol>`,13)]))}const g=n(i,[["render",r]]);export{u as __pageData,g as default};
