import{_ as a,c as s,al as e,o as i}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Compiling with CMake","description":"","frontmatter":{},"headers":[],"relativePath":"en/quickstart/compiling_cmake.md","filePath":"en/quickstart/compiling_cmake.md"}'),t={name:"en/quickstart/compiling_cmake.md"};function p(o,n,l,c,d,r){return i(),s("div",null,n[0]||(n[0]=[e(`<h1 id="compiling-with-cmake" tabindex="-1">Compiling with CMake <a class="header-anchor" href="#compiling-with-cmake" aria-label="Permalink to &quot;Compiling with CMake&quot;">​</a></h1><h2 id="initialize-configuration-with-cmake" tabindex="-1">Initialize Configuration with CMake <a class="header-anchor" href="#initialize-configuration-with-cmake" aria-label="Permalink to &quot;Initialize Configuration with CMake&quot;">​</a></h2><p>The first step is to initialize NuttX configuration for a given board, based on a pre-existing configuration. To list all supported configurations you can do:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> ./tools/configure.sh -L | less</span></span></code></pre></div></blockquote><p>The output is in the format <code>&lt;board name&gt;:&lt;board configuration&gt;</code>. You will see that generally all boards support the <code>nsh</code> configuration which is a good starting point since it enables booting into the interactive command line [[/application](]{.title-ref}/application.md)s/nsh/index\`.</p><p>To choose a configuration you pass the <code>&lt;board name&gt;:&lt;board configuration&gt;</code> such as:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> cmake -B build -DBOARD_CONFIG=stm32f4discovery:nsh -GNinja</span></span></code></pre></div></blockquote><p>The <code>-B build</code> tells what is the build directory.</p><p>You can then customize this configuration by using the menu based configuration system with:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> cmake --build build -t menuconfig</span></span></code></pre></div><p>Modifying the configuration is covered in [[configuring]{.title-ref}.]([configuring]{.title-ref}..md)</p><h2 id="build-nuttx-with-cmake" tabindex="-1">Build NuttX with CMake <a class="header-anchor" href="#build-nuttx-with-cmake" aria-label="Permalink to &quot;Build NuttX with CMake&quot;">​</a></h2><p>We can now build NuttX. To do so, you can simply run:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> cmake --build build</span></span></code></pre></div></blockquote><p>The build will complete by generating the binary outputs inside <code>build/</code> directory. Typically this includes the <code>nuttx</code> ELF file (suitable for debugging using <code>gdb</code>) and a <code>nuttx.bin</code> file that can be flashed to the board.</p><p>To clean the build, you can do:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cmake --build build -t clean</span></span></code></pre></div></blockquote><h2 id="out-of-tree-building" tabindex="-1">Out-of-tree building <a class="header-anchor" href="#out-of-tree-building" aria-label="Permalink to &quot;Out-of-tree building&quot;">​</a></h2><p>Key benefit of CMake is the out-of-tree building, which allows one to have different build folders for different configs, very proper if one need check multiple configs for the same codebase. Out-of-tree means above <code>build</code> folders can be out of Nuttx source tree.</p><p>Suppose <code>NUTTX_DIR</code> is the nuttx source tree, we can use temporary folder for a particular target config as shown below.</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> echo NUTTX_DIR</span></span>
<span class="line"><span>/home/user/Projects/Nuttx/nuttx</span></span>
<span class="line"><span> mkdir -p ~/tmp/rv32/nsh</span></span>
<span class="line"><span> cd ~/tmp/rv32/nsh</span></span>
<span class="line"><span># Make sure a proper toolchain is in your PATH</span></span>
<span class="line"><span> riscv64-unknown-elf-gcc -v</span></span>
<span class="line"><span> cmake NUTTX_DIR -DBOARD_CONFIG=rv-virt:nsh -GNinja</span></span>
<span class="line"><span>-- Initializing NuttX</span></span>
<span class="line"><span>--   Board:  rv-virt</span></span>
<span class="line"><span>--   Config: nsh</span></span>
<span class="line"><span>--   Appdir: /home/yf/Projects/Nuttx/apps</span></span>
<span class="line"><span>-- The C compiler identification is GNU 10.2.0</span></span>
<span class="line"><span>-- The CXX compiler identification is GNU 10.2.0</span></span>
<span class="line"><span>-- The ASM compiler identification is GNU</span></span>
<span class="line"><span>-- Found assembler: /usr/bin/riscv64-unknown-elf-gcc</span></span>
<span class="line"><span>-- Configuring done</span></span>
<span class="line"><span>-- Generating done</span></span>
<span class="line"><span>-- Build files have been written to: /home/yf/tmp/rv32/nsh</span></span>
<span class="line"><span> ninja</span></span>
<span class="line"><span> size nuttx</span></span>
<span class="line"><span>   text    data      bss      dec      hex  filename</span></span>
<span class="line"><span> 167411      365    11568   179344    2bc90  nuttx</span></span></code></pre></div></blockquote><p>This approach works for FLAT configs now and PROTECTED configs soon if needed CMake scripts are available already.</p><h2 id="building-kernel-configs" tabindex="-1">Building KERNEL configs <a class="header-anchor" href="#building-kernel-configs" aria-label="Permalink to &quot;Building KERNEL configs&quot;">​</a></h2><p>We can use CMake to build the kernel image for KERNEL configs now, assuming apps ROMFS is prepared using the makefile system. If the development focus is kernel side and apps don&#39;t change often, then CMake can help us achieve out-of-tree build if your device&#39;s CMake scripts are ready. Let&#39;s take <code>canm230</code> device as an example:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> echo NUTTX_DIR</span></span>
<span class="line"><span>/home/user/Projects/Nuttx/nuttx</span></span>
<span class="line"><span> mkdir -p ~/tmp/k230/nsbi</span></span>
<span class="line"><span># copy the romfs_boot.c to build folder</span></span>
<span class="line"><span> cp romfs_boot.c ~/tmp/k230/nsbi</span></span>
<span class="line"><span> cd ~/tmp/k230/nsbi</span></span>
<span class="line"><span> ls -l</span></span>
<span class="line"><span>total 976</span></span>
<span class="line"><span>-rw-rw-r-- 1 yf yf 997843 Jul 15 06:23 romfs_boot.c</span></span>
<span class="line"><span> cmake NUTTX_DIR -DBOARD_CONFIG=canmv230:nsbi -GNinja</span></span>
<span class="line"><span>-- Initializing NuttX</span></span>
<span class="line"><span>--   Board:  canmv230</span></span>
<span class="line"><span>--   Config: nsbi</span></span>
<span class="line"><span>--   Appdir: /home/yf/Projects/Nuttx/apps</span></span>
<span class="line"><span>-- The C compiler identification is GNU 10.2.0</span></span>
<span class="line"><span>-- The CXX compiler identification is GNU 10.2.0</span></span>
<span class="line"><span>-- The ASM compiler identification is GNU</span></span>
<span class="line"><span>-- Found assembler: /usr/bin/riscv64-unknown-elf-gcc</span></span>
<span class="line"><span>-- Configuring done</span></span>
<span class="line"><span>-- Generating done</span></span>
<span class="line"><span>-- Build files have been written to: /home/yf/tmp/k230/nsbi</span></span>
<span class="line"><span> ninja</span></span>
<span class="line"><span> size nuttx</span></span>
<span class="line"><span>  text     data      bss      dec      hex  filename</span></span>
<span class="line"><span>281671      609    37496   319776    4e120  nuttx</span></span></code></pre></div></blockquote><p>Note that for QEMU targets, we can directly use the apps binary on host folder via <code>hostfs</code> in QEMU.</p><p>So even apps side CMake support is not ready, we still can enjoy CMake for kernel build with KERNEL configs.</p>`,27)]))}const g=a(t,[["render",p]]);export{h as __pageData,g as default};
