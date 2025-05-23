import{_ as i,c as t,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"rv-virt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/qemu-rv/boards/rv-virt/index.md","filePath":"en/platforms/risc-v/qemu-rv/boards/rv-virt/index.md"}'),a={name:"en/platforms/risc-v/qemu-rv/boards/rv-virt/index.md"};function r(s,e,c,d,h,l){return n(),t("div",null,e[0]||(e[0]=[o(`<h1 id="rv-virt" tabindex="-1">rv-virt <a class="header-anchor" href="#rv-virt" aria-label="Permalink to &quot;rv-virt&quot;">​</a></h1><h2 id="risc-v-toolchain" tabindex="-1">RISC-V Toolchain <a class="header-anchor" href="#risc-v-toolchain" aria-label="Permalink to &quot;RISC-V Toolchain&quot;">​</a></h2><p>Any generic RISC-V toolchain can be used. It&#39;s recommended to use the same toolchain used by NuttX CI.</p><p>Please refer to the <a href="https://github.com/apache/nuttx/tree/master/tools/ci/docker/linux/Dockerfile" target="_blank" rel="noreferrer">Docker container</a> and check for the current compiler version being used. For instance:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>###############################################################################</span></span>
<span class="line"><span># Build image for tool required by RISCV builds</span></span>
<span class="line"><span>###############################################################################</span></span>
<span class="line"><span>FROM nuttx-toolchain-base AS nuttx-toolchain-riscv</span></span>
<span class="line"><span># Download the latest RISCV GCC toolchain prebuilt by xPack</span></span>
<span class="line"><span>RUN mkdir riscv-none-elf-gcc &amp;&amp; \\</span></span>
<span class="line"><span>curl -s -L &quot;https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/releases/download/v13.2.0-2/xpack-riscv-none-elf-gcc-13.2.0-2-linux-x64.tar.gz&quot; \\</span></span>
<span class="line"><span>| tar -C riscv-none-elf-gcc --strip-components 1 -xz</span></span></code></pre></div><p>It uses the xPack&#39;s prebuilt toolchain based on GCC 13.2.0-2.</p><h2 id="risc-v-qemu" tabindex="-1">RISC-V QEMU <a class="header-anchor" href="#risc-v-qemu" aria-label="Permalink to &quot;RISC-V QEMU&quot;">​</a></h2><p>Build and install <code>qemu</code>:</p><pre><code> git clone https://github.com/qemu/qemu
 cd qemu
 ./configure --target-list=riscv32-softmmu,riscv64-softmmu
 make
 sudo make install
</code></pre><h2 id="minimum-requirement" tabindex="-1">Minimum Requirement <a class="header-anchor" href="#minimum-requirement" aria-label="Permalink to &quot;Minimum Requirement&quot;">​</a></h2><p>The table below lists all the minimum versions for QEMU and OpenSBI. For stability, it is also recommended to use the latest QEMU and OpenSBI.</p><hr><p>Extension QEMU Version OpenSBI Version</p><hr><p>No extension 6.2.0 v1.0</p><p>SSTC 7.2.9 v1.1</p><h2 id="aia-8-2-0-v1-2" tabindex="-1">AIA 8.2.0 v1.2 <a class="header-anchor" href="#aia-8-2-0-v1-2" aria-label="Permalink to &quot;AIA                          8.2.0          v1.2&quot;">​</a></h2><p>For users who wish to use their own OpenSBI, please refer to <a href="https://github.com/riscv-software-src/opensbi" target="_blank" rel="noreferrer">OpenSBI repository</a>.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>All of the configurations presented below can be tested by running the following commands:</p><pre><code> ./tools/configure.sh rv-virt:&lt;config_name&gt;
</code></pre><p>Where &lt;config_name&gt; is the name of the configuration you want to use, i.e.: nsh, knsh, knsh64...</p><p>To build it, run the following command:</p><pre><code> make -j(nproc)
</code></pre><p>or, with more verbosity:</p><pre><code> make V=1 -j(nproc)
</code></pre><p>Warning</p><p>Some configurations require additional steps to be built. Please refer to the specific configurations to check it out</p><p>Finally, to run it, use the following command:</p><p>For 32-bit configurations:</p><pre><code> qemu-system-riscv32 -semihosting -M virt,aclint=on -cpu rv32 -smp &lt;cpu number&gt; -bios none -kernel nuttx -nographic
</code></pre><p>And, for 64-bit configurations:</p><pre><code> qemu-system-riscv64 -semihosting -M virt,aclint=on -cpu rv64 -smp &lt;cpu number&gt; -bios none -kernel nuttx -nographic
</code></pre><p><code>-smp</code> option can be only used in smp build, and the <code>cpu number</code> needs to be set to the same value as <code>CONFIG_SMP_NCPUS</code> in the build config file.</p><p>If testing with S-mode build, remove the <code>-bios none</code> option. S-mode build requires SBI to function properly.</p><p>For BUILD_PROTECTED the user-space binary must also be loaded, which can be done by adding <code>-device loader,file=./nuttx_user</code> to the command line arguments.</p><h3 id="citest" tabindex="-1">citest <a class="header-anchor" href="#citest" aria-label="Permalink to &quot;citest&quot;">​</a></h3><p>This configuration is the default configuration intended to be used by the automated testing on CI of 32-bit RISC-V using QEMU.</p><p>To run it with QEMU, use the following command:</p><pre><code> qemu-system-riscv32 -semihosting -M virt -cpu rv32 \\
  -drive index=0,id=userdata,if=none,format=raw,file=./fatfs.img \\
  -device virtio-blk-device,bus=virtio-mmio-bus.0,drive=userdata \\
  -bios none -kernel nuttx -nographic
</code></pre><p>To run the CI scripts, use the following command:</p><pre><code> ./nuttx/boards/risc-v/qemu-rv/rv-virt/configs/citest/run
</code></pre><h3 id="citest64" tabindex="-1">citest64 <a class="header-anchor" href="#citest64" aria-label="Permalink to &quot;citest64&quot;">​</a></h3><p>Identical to the <a href="#citest">citest</a> configuration, but for 64-bit RISC-V.</p><h3 id="fb" tabindex="-1">fb <a class="header-anchor" href="#fb" aria-label="Permalink to &quot;fb&quot;">​</a></h3><p>Uses the VirtIO GPU driver to run the [fb]{.title-ref} demo application on 32-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> qemu-system-riscv32 -semihosting -M virt -cpu rv32 -smp 8 \\
  -chardev stdio,id=con,mux=on \\
  -serial chardev:con \\
  -device virtio-gpu-device,xres=640,yres=480,bus=virtio-mmio-bus.0 \\
  -mon chardev=con,mode=readline \\
  -bios none -kernel nuttx
</code></pre><h3 id="fb64" tabindex="-1">fb64 <a class="header-anchor" href="#fb64" aria-label="Permalink to &quot;fb64&quot;">​</a></h3><p>Identical to the <a href="#fb">fb</a> configuration, but for 64-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> qemu-system-riscv64 -semihosting -M virt -cpu rv64 -smp 8 \\
  -chardev stdio,id=con,mux=on \\
  -serial chardev:con \\
  -device virtio-gpu-device,xres=640,yres=480,bus=virtio-mmio-bus.0 \\
  -mon chardev=con,mode=readline \\
  -bios none -kernel nuttx
</code></pre><h3 id="knetnsh64" tabindex="-1">knetnsh64 <a class="header-anchor" href="#knetnsh64" aria-label="Permalink to &quot;knetnsh64&quot;">​</a></h3><p>Similar to the <a href="#knsh">knsh</a> configuration, but with networking support and 64-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> dd if=/dev/zero of=./mydisk-1gb.img bs=1M count=1024

 qemu-system-riscv64 -semihosting -M virt,aclint=on -cpu rv64 -smp 8 \\
  -global virtio-mmio.force-legacy=false \\
  -device virtio-serial-device,bus=virtio-mmio-bus.0 \\
  -chardev socket,telnet=on,host=127.0.0.1,port=3450,server=on,wait=off,id=foo \\
  -device virtconsole,chardev=foo \\
  -device virtio-rng-device,bus=virtio-mmio-bus.1 \\
  -netdev user,id=u1,hostfwd=tcp:127.0.0.1:10023-10.0.2.15:23,hostfwd=tcp:127.0.0.1:15001-10.0.2.15:5001 \\
  -device virtio-net-device,netdev=u1,bus=virtio-mmio-bus.2 \\
  -drive file=./mydisk-1gb.img,if=none,format=raw,id=hd \\
  -device virtio-blk-device,bus=virtio-mmio-bus.3,drive=hd \\
  -kernel ./nuttx/nuttx -nographic
</code></pre><h3 id="knetnsh64-smp" tabindex="-1">knetnsh64_smp <a class="header-anchor" href="#knetnsh64-smp" aria-label="Permalink to &quot;knetnsh64\\_smp&quot;">​</a></h3><p>Similar to the <a href="#knetnsh64">knetnsh64</a> configuration, but with SMP support for 64-bit RISC-V.</p><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is similar to the <a href="#nsh">nsh</a> configuration except that NuttX is built as a kernel-mode, monolithic module, and the user applications are built separately. It uses [hostfs]{.title-ref} and QEMU in semi-hosting mode to load the user-space applications. This is intended to 32-bit RISC-V.</p><p>To build it, use the following command:</p><pre><code> make V=1 -j(nproc)
 make export V=1 -j(nproc)
 pushd ../apps
 ./tools/mkimport.sh -z -x ../nuttx/nuttx-export-*.tar.gz
 make import V=1 -j(nproc)
 popd
</code></pre><p>Run it with QEMU using the default command for 32-bit RISC-V.</p><p>In [nsh]{.title-ref}, applications can be run from the [/system/bin]{.title-ref} directory:</p><pre><code>nsh&gt; /system/bin/hello
</code></pre><h3 id="knsh-paging" tabindex="-1">knsh_paging <a class="header-anchor" href="#knsh-paging" aria-label="Permalink to &quot;knsh\\_paging&quot;">​</a></h3><p>Similar to <code>knsh_romfs</code>, but enabling on-demand paging: this configuration simulates a 4MiB device (using QEMU), but sets the number of heap pages equal to <code>CONFIG_ARCH_HEAP_NPAGES=2048</code>. This means that each process&#39;s heap is 8MiB, whereas <code>CONFIG_POSIX_SPAWN_DEFAULT_STACKSIZE</code> is <code>1048576</code> (1MiB) represents the stack size of the processes (which is allocated from the process&#39;s heap). This configuration is used for 32-bit RISC-V which implements the Sv32 MMU specification and enables processes to have their own address space larger than the available physical memory. This is particularly useful for implementing a set of programming language interpreters.</p><h3 id="knsh-romfs" tabindex="-1">knsh_romfs <a class="header-anchor" href="#knsh-romfs" aria-label="Permalink to &quot;knsh\\_romfs&quot;">​</a></h3><p>Similar to the <a href="#knsh">knsh</a> configuration, but uses ROMFS instead of [hostfs]{.title-ref}. A ROMFS image is generated and linked to the kernel. This requires re-running <code>make</code>:</p><pre><code> make V=1 -j(nproc)
 make export V=1 -j(nproc)
 pushd ../apps
 ./tools/mkimport.sh -z -x ../nuttx/nuttx-export-*.tar.gz
 make import V=1 -j(nproc)
 ./tools/mkromfsimg.sh ../nuttx/arch/risc-v/src/board/romfs_boot.c
 popd
 make V=1 -j(nproc)
</code></pre><p>To run it, use the following command:</p><pre><code> qemu-system-riscv32 -M virt,aclint=on -cpu rv32 -kernel nuttx -nographic
</code></pre><p>In [nsh]{.title-ref}, applications can be run from the [/system/bin]{.title-ref} directory:</p><pre><code>nsh&gt; /system/bin/hello
</code></pre><h3 id="knsh64" tabindex="-1">knsh64 <a class="header-anchor" href="#knsh64" aria-label="Permalink to &quot;knsh64&quot;">​</a></h3><p>Similar to the <a href="#knsh">knsh</a> configuration, but for 64-bit RISC-V.</p><p>Run it with QEMU using the default command for 64-bit RISC-V.</p><p>In [nsh]{.title-ref}, applications can be run from the [/system/bin]{.title-ref} directory:</p><pre><code>nsh&gt; /system/bin/hello
</code></pre><h3 id="ksmp64" tabindex="-1">ksmp64 <a class="header-anchor" href="#ksmp64" aria-label="Permalink to &quot;ksmp64&quot;">​</a></h3><p>Identical to the <a href="#knsh64">knsh64</a> configuration but with SMP support.</p><h3 id="leds" tabindex="-1">leds <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;leds&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but with User LEDs support for 32-bit RISC-V.</p><h3 id="leds64" tabindex="-1">leds64 <a class="header-anchor" href="#leds64" aria-label="Permalink to &quot;leds64&quot;">​</a></h3><p>Similar to the <a href="#nsh64">nsh64</a> configuration, but with User LEDs support for 64-bit RISC-V.</p><h3 id="leds64-rust" tabindex="-1">leds64_rust <a class="header-anchor" href="#leds64-rust" aria-label="Permalink to &quot;leds64\\_rust&quot;">​</a></h3><p>Similar to the <a href="#leds64">leds64</a> configuration, but with <code>leds_rust</code> example enabled.</p><h3 id="leds64-zig" tabindex="-1">leds64_zig <a class="header-anchor" href="#leds64-zig" aria-label="Permalink to &quot;leds64\\_zig&quot;">​</a></h3><p>Similar to the <a href="#leds64">leds64</a> configuration, but with <code>leds_zig</code> example enabled.</p><h3 id="netnsh" tabindex="-1">netnsh <a class="header-anchor" href="#netnsh" aria-label="Permalink to &quot;netnsh&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but with networking support for 32-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> dd if=/dev/zero of=./mydisk-1gb.img bs=1M count=1024

 qemu-system-riscv32 -semihosting -M virt,aclint=on -cpu rv32 -smp 8 \\
  -global virtio-mmio.force-legacy=false \\
  -device virtio-serial-device,bus=virtio-mmio-bus.0 \\
  -chardev socket,telnet=on,host=127.0.0.1,port=3450,server=on,wait=off,id=foo \\
  -device virtconsole,chardev=foo \\
  -device virtio-rng-device,bus=virtio-mmio-bus.1 \\
  -netdev user,id=u1,hostfwd=tcp:127.0.0.1:10023-10.0.2.15:23,hostfwd=tcp:127.0.0.1:15001-10.0.2.15:5001 \\
  -device virtio-net-device,netdev=u1,bus=virtio-mmio-bus.2 \\
  -drive file=./mydisk-1gb.img,if=none,format=raw,id=hd \\
  -device virtio-blk-device,bus=virtio-mmio-bus.3,drive=hd \\
  -bios none -kernel ./nuttx/nuttx -nographic
</code></pre><h3 id="netnsh64" tabindex="-1">netnsh64 <a class="header-anchor" href="#netnsh64" aria-label="Permalink to &quot;netnsh64&quot;">​</a></h3><p>Similar to the <a href="#netnsh">netnsh</a> configuration, but for 64-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> dd if=/dev/zero of=./mydisk-1gb.img bs=1M count=1024

 qemu-system-riscv64 -semihosting -M virt,aclint=on -cpu rv64 -smp 8 \\
  -global virtio-mmio.force-legacy=false \\
  -device virtio-serial-device,bus=virtio-mmio-bus.0 \\
  -chardev socket,telnet=on,host=127.0.0.1,port=3450,server=on,wait=off,id=foo \\
  -device virtconsole,chardev=foo \\
  -device virtio-rng-device,bus=virtio-mmio-bus.1 \\
  -netdev user,id=u1,hostfwd=tcp:127.0.0.1:10023-10.0.2.15:23,hostfwd=tcp:127.0.0.1:15001-10.0.2.15:5001 \\
  -device virtio-net-device,netdev=u1,bus=virtio-mmio-bus.2 \\
  -drive file=./mydisk-1gb.img,if=none,format=raw,id=hd \\
  -device virtio-blk-device,bus=virtio-mmio-bus.3,drive=hd \\
  -bios none -kernel ./nuttx/nuttx -nographic
</code></pre><h3 id="netnsh64-smp" tabindex="-1">netnsh64_smp <a class="header-anchor" href="#netnsh64-smp" aria-label="Permalink to &quot;netnsh64\\_smp&quot;">​</a></h3><p>Similar to the <a href="#netnsh64">netnsh64</a> configuration, but with SMP support for 64-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> dd if=/dev/zero of=./mydisk-1gb.img bs=1M count=1024

 qemu-system-riscv64 -semihosting -M virt,aclint=on -cpu rv64 -smp 8 \\
  -global virtio-mmio.force-legacy=false \\
  -device virtio-serial-device,bus=virtio-mmio-bus.0 \\
  -chardev socket,telnet=on,host=127.0.0.1,port=3450,server=on,wait=off,id=foo \\
  -device virtconsole,chardev=foo \\
  -device virtio-rng-device,bus=virtio-mmio-bus.1 \\
  -netdev user,id=u1,hostfwd=tcp:127.0.0.1:10023-10.0.2.15:23,hostfwd=tcp:127.0.0.1:15001-10.0.2.15:5001 \\
  -device virtio-net-device,netdev=u1,bus=virtio-mmio-bus.2 \\
  -drive file=./mydisk-1gb.img,if=none,format=raw,id=hd \\
  -device virtio-blk-device,bus=virtio-mmio-bus.3,drive=hd \\
  -bios none -kernel ./nuttx/nuttx -nographic
</code></pre><h3 id="netnsh-smp" tabindex="-1">netnsh_smp <a class="header-anchor" href="#netnsh-smp" aria-label="Permalink to &quot;netnsh\\_smp&quot;">​</a></h3><p>Similar to the <a href="#netnsh">netnsh</a> configuration, but with SMP support for 32-bit RISC-V.</p><p>To run it with QEMU, use the following command:</p><pre><code> dd if=/dev/zero of=./mydisk-1gb.img bs=1M count=1024

 qemu-system-riscv32 -semihosting -M virt,aclint=on -cpu rv32 -smp 8 \\
  -global virtio-mmio.force-legacy=false \\
  -device virtio-serial-device,bus=virtio-mmio-bus.0 \\
  -chardev socket,telnet=on,host=127.0.0.1,port=3450,server=on,wait=off,id=foo \\
  -device virtconsole,chardev=foo \\
  -device virtio-rng-device,bus=virtio-mmio-bus.1 \\
  -netdev user,id=u1,hostfwd=tcp:127.0.0.1:10023-10.0.2.15:23,hostfwd=tcp:127.0.0.1:15001-10.0.2.15:5001 \\
  -device virtio-net-device,netdev=u1,bus=virtio-mmio-bus.2 \\
  -drive file=./mydisk-1gb.img,if=none,format=raw,id=hd \\
  -device virtio-blk-device,bus=virtio-mmio-bus.3,drive=hd \\
  -bios none -kernel ./nuttx/nuttx -nographic
</code></pre><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This NSH configuration is focused on low-level, command-line driver testing. This configuration is used for 32-bit RISC-V</p><h3 id="python" tabindex="-1">python <a class="header-anchor" href="#python" aria-label="Permalink to &quot;python&quot;">​</a></h3><p>Enables the Python interpreter for NuttX. This configuration is based on <a href="#netnsh">netnsh</a>.</p><p>For more information on how to build and run Python on NuttX, please refer to the [[Python Interpreter &lt;/application](\`Python Interpreter &lt;/application.md)s/interpreters/python/index&gt;]{.title-ref} page.</p><h3 id="nsh64" tabindex="-1">nsh64 <a class="header-anchor" href="#nsh64" aria-label="Permalink to &quot;nsh64&quot;">​</a></h3><p>Identical to the <a href="#nsh">nsh</a> configuration, but for 64-bit RISC-V.</p><h3 id="smp" tabindex="-1">smp <a class="header-anchor" href="#smp" aria-label="Permalink to &quot;smp&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but with SMP support. This configuration is used for 32-bit RISC-V</p><h3 id="smp64" tabindex="-1">smp64 <a class="header-anchor" href="#smp64" aria-label="Permalink to &quot;smp64&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but with SMP support This configuration is used for 64-bit RISC-V</p><h3 id="flats" tabindex="-1">flats <a class="header-anchor" href="#flats" aria-label="Permalink to &quot;flats&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but running in S-mode. This configuration is used for 32-bit RISC-V</p><h3 id="flats64" tabindex="-1">flats64 <a class="header-anchor" href="#flats64" aria-label="Permalink to &quot;flats64&quot;">​</a></h3><p>Similar to the <a href="#nsh">nsh</a> configuration, but running in S-mode. This configuration is used for 64-bit RISC-V</p><h3 id="virt-nsh" tabindex="-1">virt_nsh <a class="header-anchor" href="#virt-nsh" aria-label="Permalink to &quot;virt\\_nsh&quot;">​</a></h3><p>Similar to <a href="#nsh">nsh</a> configuration, but uses virtio serial device as console. Use it below with QEMU:</p><pre><code> qemu-system-riscv32 -M virt,aclint=on -nographic \\
-chardev socket,id=aux,path=/tmp/aux,server=on,wait=on \\
-device virtio-serial-device,bus=virtio-mmio-bus.0 \\
-device virtconsole,chardev=aux \\
-bios nuttx
</code></pre><p>Then from another terminal, use below command to access the console:</p><pre><code> socat UNIX-CLIENT:/tmp/aux -
</code></pre><p>We can finish the session with <code>quit</code> command in NSH session.</p><p>Note the above command line uses UNIX domain socket so please change the socket parameters on hosts without UNIX domain socket.</p><h2 id="risc-v-gdb-debugging" tabindex="-1">RISC-V GDB Debugging <a class="header-anchor" href="#risc-v-gdb-debugging" aria-label="Permalink to &quot;RISC-V GDB Debugging&quot;">​</a></h2><p>First of all, make sure to select <code>CONFIG_DEBUG_SYMBOLS=y</code> in [menuconfig]{.title-ref}.</p><p>After building the kernel (and the applications, in kernel mode), use the toolchain&#39;s GDB to debug RISC-V applications. For instance, if you are using the xPack&#39;s prebuilt toolchain, you can use the following command to start GDB:</p><pre><code> riscv-none-elf-gdb-py3 -ix tools/pynuttx/gdbinit.py --tui nuttx
</code></pre><p>To use QEMU for debugging, one should add the parameters <code>-s -S</code> to the QEMU command line.</p><p>For instance:</p><pre><code> qemu-system-riscv32 -semihosting -M virt,aclint=on -cpu rv32 -smp 8 -bios none -kernel nuttx -nographic -s -S
</code></pre><p>Then, in GDB, use the following command to connect to QEMU:</p><pre><code> target extended-remote localhost:1234
</code></pre><h3 id="debugging-applications-in-kernel-mode" tabindex="-1">Debugging Applications in Kernel Mode <a class="header-anchor" href="#debugging-applications-in-kernel-mode" aria-label="Permalink to &quot;Debugging Applications in Kernel Mode&quot;">​</a></h3><p>In kernel mode, only the kernel symbols are loaded by default.</p><p>If needed, one should also load the application symbols using the following command:</p><pre><code> add-symbol-file &lt;file&gt; &lt;address&gt;
</code></pre><p><code>address</code> refers to the <code>.text</code> section of the application and can be retrieved from the ELF file using the following command:</p><pre><code> riscv-none-elf-readelf -WS &lt;file&gt; | grep .text
</code></pre><p>For instance, to check the <code>.text</code> section address of the <code>hello</code> application, use the following command:</p><pre><code> riscv-none-elf-readelf -WS ../apps/bin/hello | grep .text
[ 1] .text             PROGBITS        c0000000 001000 0009e0 00  AX  0   0  2
</code></pre><p>Note</p><p>Pay attention that <code>riscv-none-elf-readelf</code> refers to your toolchain&#39;s readelf utility. Adjust accordingly if you are using a different toolchain.</p><p>Then, look for the <code>.text</code> section address and use the <code>c0000000</code> as the address to load the symbols.</p><p>For instance, if you want to load the <code>hello</code> application, you can use the following command in GDB:</p><pre><code> add-symbol-file ../apps/bin/hello 0xc0000000
</code></pre><p>Then, you can set breakpoints, step through the code, and inspect the memory and registers of the applications too.</p>`,150)]))}const m=i(a,[["render",r]]);export{u as __pageData,m as default};
