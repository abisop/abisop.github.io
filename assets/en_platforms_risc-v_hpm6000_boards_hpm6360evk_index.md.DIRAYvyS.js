import{_ as o,c as n,al as t,o as c}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"hpm6360evk","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/hpm6000/boards/hpm6360evk/index.md","filePath":"en/platforms/risc-v/hpm6000/boards/hpm6360evk/index.md"}'),a={name:"en/platforms/risc-v/hpm6000/boards/hpm6360evk/index.md"};function p(i,e,d,s,l,r){return c(),n("div",null,e[0]||(e[0]=[t(`<h1 id="hpm6360evk" tabindex="-1">hpm6360evk <a class="header-anchor" href="#hpm6360evk" aria-label="Permalink to &quot;hpm6360evk&quot;">​</a></h1><ol><li><p>Download and install toolchain:</p><pre><code>curl https://github.com/hpmicro/riscv-gnu-toolchain/releases/tag/2022.05.15
</code></pre></li><li><p>Download and install openocd.</p></li></ol><blockquote><p>Download hpmicro sdk_env, openocd in the path: sdk_env/tools/openocd</p></blockquote><ol start="3"><li><p>Configure and build NuttX:</p><pre><code>mkdir ./nuttxspace
cd ./nuttxspace
git clone https://github.com/apache/nuttx.git nuttx
git clone https://github.com/apache/nuttx-apps.git apps
cd nuttx
make distclean
./tools/configure.sh hpm6750evk2:nsh
make menuconfig
make V=1
</code></pre></li></ol><p>Note: make menuconfig to config toolchain</p><p>To switch GNU riscv64 toolchain to GNU riscv32 toolchain, the following option must be selected:</p><pre><code>System Type  ---&gt;
    Toolchain Selection   ---&gt;
        [ ] Generic GNU RV64 toolchain
        [x] Generic GNU RV32 toolchain
</code></pre><p>Make sure HPMicro GNU riscv32 toolchain have been installed and be found in PATH.</p><ol start="4"><li><p>Debug the nuttx with openocd and run:</p><pre><code>picocom -b 115200 /dev/ttyACM0
</code></pre></li></ol><blockquote><p>When using fireDAP, command as follows. Those cfg files in the path: <code>sdk_env/hpm_sdk/boards/openocd</code>:</p><pre><code> openocd -f probes/cmsis_dap.cfg -f soc/hpm6750-single-core.cfg -f boards/hpm6750evk2.cfg

 riscv32-unknown-elf-gdb ./nuttx
(gdb) target extended-remote [ip_addr]:3333
(gdb) load
(gdb) c
</code></pre></blockquote>`,10)]))}const u=o(a,[["render",p]]);export{m as __pageData,u as default};
