import{_ as n,c as a,al as p,o as e}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"C++ Example using CMake","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/cpp_cmake.md","filePath":"en/guides/cpp_cmake.md"}'),l={name:"en/guides/cpp_cmake.md"};function i(t,s,c,o,r,d){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="c-example-using-cmake" tabindex="-1">C++ Example using CMake <a class="header-anchor" href="#c-example-using-cmake" aria-label="Permalink to &quot;C++ Example using CMake&quot;">​</a></h1><p>In some situations, developers intend to implement software using the NuttX platform in a previously set hardware and configuration where it is not possible or allowed to make changes. In such situations, less contact with the operating source tree is better, where it is only used for the application.</p><p>Some approaches are possible to do that today:</p><ul><li><a href="https://cwiki.apache.org/confluence/display/NUTTX/Building+NuttX+with+Applications+Outside+of+the+Source+Tree" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Building+NuttX+with+Applications+Outside+of+the+Source+Tree</a></li><li><a href="https://www.programmersought.com/article/61604062421/" target="_blank" rel="noreferrer">https://www.programmersought.com/article/61604062421/</a></li></ul><p>We have been seen the increase of the use of C++ language in embedded systems application. And CMake (<a href="https://www.cmake.org" target="_blank" rel="noreferrer">https://www.cmake.org</a>) is the preferred build system used to build C++ projects. NuttX support C++ based projects.</p><p>Using the &#39;build as a library&#39; procedure of NuttX, it is possible to build NuttX applications using C++ language and also the cmake build tool.</p><p>This document will show how to reimplement the hellocpp project using this cmake.</p><h2 id="preparation" tabindex="-1">Preparation <a class="header-anchor" href="#preparation" aria-label="Permalink to &quot;Preparation&quot;">​</a></h2><ol><li><p>Base NuttX compilation changes</p><blockquote><p>For this example, load the configuration &#39;stm32f4discovery:testlibcxx&#39; for building</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> ./tools/configure.sh stm32f4discovery:testlibcxx</span></span></code></pre></div><p>In menuconfig, the main points to be changed on a typical NuttX configuration are the following:</p><ul><li>Set RTOS Features -&gt; Tasks and Scheduling -&gt; Application entry point to &#39;hellocpp_main&#39;</li><li>Build NuttX and generate the export</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make export</span></span></code></pre></div></blockquote></li></ol><h2 id="creating-the-project" tabindex="-1">Creating the project <a class="header-anchor" href="#creating-the-project" aria-label="Permalink to &quot;Creating the project&quot;">​</a></h2><ol><li><p>Create your project file structure</p><blockquote><p>The project structure is organized as follow:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hellocpp/</span></span>
<span class="line"><span>hellocpp/CMakeLists.txt</span></span>
<span class="line"><span>hellocpp/cmake/stm32f4discovery.cmake</span></span>
<span class="line"><span>hellocpp/nuttx-export-10.0.1/</span></span>
<span class="line"><span>hellocpp/src/CMakeLists.txt</span></span>
<span class="line"><span>hellocpp/src/main.cpp</span></span>
<span class="line"><span>hellocpp/src/HelloWorld.h</span></span>
<span class="line"><span>hellocpp/src/HelloWorld.cpp</span></span></code></pre></div><p>The directory &#39;nuttx-export-10.0.1&#39; is the unzipped content from the file created during make export procedure done before.</p></blockquote></li><li><p>File contents</p></li></ol><ul><li>hellocpp/CMakeLists.txt</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cmake_minimum_required(VERSION 3.2...3.15)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>project(HelloCpp</span></span>
<span class="line"><span>        VERSION 1.0</span></span>
<span class="line"><span>        DESCRIPTION &quot;Hello world C++ NuttX&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(CMAKE_CXX_STANDARD 17)</span></span>
<span class="line"><span>set(CMAKE_CXX_STANDARD_REQUIRED ON)</span></span>
<span class="line"><span># set(CMAKE_CXX_EXTENSIONS OFF)</span></span>
<span class="line"><span>set(CMAKE_C_STANDARD 99)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(NUTTX_PATH &quot;{CMAKE_SOURCE_DIR}/nuttx-export-10.0.1&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>include(cmake/stm32f4discovery.cmake)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(AC_COMMON_FLAGS &quot;{AC_COMMON_FLAGS} -Wall -Wshadow -Wundef -fno-strict-aliasing -Os&quot;)</span></span>
<span class="line"><span>set(AC_COMMON_FLAGS &quot;{AC_COMMON_FLAGS} -D_DEBUG -D_LIBCPP_BUILD_STATIC -D_LIBCPP_NO_EXCEPTIONS &quot;)</span></span>
<span class="line"><span>set(AC_COMMON_FLAGS &quot;{AC_COMMON_FLAGS} -fno-exceptions -fcheck-new -fno-rtti -pedantic &quot;)</span></span>
<span class="line"><span>set(AC_COMMON_FLAGS &quot;{AC_COMMON_FLAGS} -nostdinc++&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(AC_DEFINES &quot;{AC_DEFINES} -DCONFIG_WCHAR_BUILTIN&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>include_directories(</span></span>
<span class="line"><span>        src</span></span>
<span class="line"><span>        {NUTTX_PATH}/include</span></span>
<span class="line"><span>        {NUTTX_PATH}/include/libcxx</span></span>
<span class="line"><span>        {NUTTX_PATH}/arch/chip</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(EXE_NAME hellocpp)</span></span>
<span class="line"><span>set(CMAKE_C_FLAGS &quot;{CMAKE_C_FLAGS} {AC_HW_FLAGS} {AC_DEFINES}&quot;)</span></span>
<span class="line"><span>set(CMAKE_CXX_FLAGS     &quot;{AC_HW_FLAGS} {AC_DEFINES} {AC_COMMON_FLAGS} {AC_CXX_EXTRA_FLAGS}&quot;)</span></span>
<span class="line"><span>if (PARAM_DEBUG)</span></span>
<span class="line"><span>    set(CMAKE_CXX_FLAGS     &quot;{CMAKE_CXX_FLAGS} -g&quot;)</span></span>
<span class="line"><span>endif()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(CMAKE_SKIP_RPATH ON)</span></span>
<span class="line"><span>set(CMAKE_CXX_LINK_EXECUTABLE &quot;{CMAKE_LINKER} {AC_LINKER_FLAGS} -o {EXE_NAME}.elf &lt;OBJECTS&gt; &lt;LINK_LIBRARIES&gt;&quot;)</span></span>
<span class="line"><span>set(BUILD_SHARED_LIBS OFF)</span></span>
<span class="line"><span>add_subdirectory(src)</span></span></code></pre></div><ul><li>hellocpp/cmake/stm32f4discovery.cmake</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set(CMAKE_SYSTEM_NAME Generic)</span></span>
<span class="line"><span>set(CMAKE_SYSTEM_PROCESSOR arm)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(MCU_LINKER_SCRIPT &quot;{NUTTX_PATH}/scripts/ld.script&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(COMPILER_PREFIX arm-none-eabi-)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cmake-format: off</span></span>
<span class="line"><span>set(CMAKE_C_COMPILER    {COMPILER_PREFIX}gcc)</span></span>
<span class="line"><span>set(CMAKE_CXX_COMPILER  {COMPILER_PREFIX}g++)</span></span>
<span class="line"><span>set(CMAKE_AR            {COMPILER_PREFIX}ar)</span></span>
<span class="line"><span>set(CMAKE_RANLIB        {COMPILER_PREFIX}ranlib)</span></span>
<span class="line"><span>set(CMAKE_LINKER        {COMPILER_PREFIX}ld)</span></span>
<span class="line"><span>set(CMAKE_ASM_COMPILER  {COMPILER_PREFIX}gcc)</span></span>
<span class="line"><span>set(CMAKE_OBJCOPY       {COMPILER_PREFIX}objcopy)</span></span>
<span class="line"><span>set(CMAKE_OBJDUMP       {COMPILER_PREFIX}objdump)</span></span>
<span class="line"><span>set(CMAKE_SIZE          {COMPILER_PREFIX}size)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)</span></span>
<span class="line"><span>set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)</span></span>
<span class="line"><span>set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)</span></span>
<span class="line"><span>set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(AC_HW_FLAGS         &quot;-mcpu=cortex-m4 -mthumb -mfloat-abi=soft &quot;)</span></span>
<span class="line"><span>set(AC_HW_FLAGS         &quot;{AC_HW_FLAGS} -isystem {NUTTX_PATH}/include&quot;)</span></span>
<span class="line"><span>set(AC_HW_FLAGS         &quot;{AC_HW_FLAGS} -pipe&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(AC_LINKER_FLAGS     &quot;--entry=__start -nostdlib -T{MCU_LINKER_SCRIPT}&quot;)</span></span></code></pre></div><ul><li>hellocpp/src/CMakeLists.txt</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set(HEADER_FILES</span></span>
<span class="line"><span>        HelloWorld.h</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set(SOURCE_FILES</span></span>
<span class="line"><span>        HelloWorld.cpp</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>link_directories({EXE_NAME} {NUTTX_PATH}/libs)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>add_executable({EXE_NAME} {SOURCE_FILES} main.cpp {HEADER_FILES})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>add_custom_command(</span></span>
<span class="line"><span>        TARGET {EXE_NAME}</span></span>
<span class="line"><span>        POST_BUILD</span></span>
<span class="line"><span>        COMMAND {CMAKE_OBJCOPY} ARGS -S -O binary {CMAKE_BINARY_DIR}/{EXE_NAME}.elf {CMAKE_BINARY_DIR}/{EXE_NAME}.bin</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} --start-group)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} sched)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} drivers)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} boards)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} c)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} mm)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} arch)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} xx)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} apps)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} fs)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} binfmt)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} board)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} gcc)</span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} supc++)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>target_link_libraries({EXE_NAME} --end-group)</span></span></code></pre></div><ul><li>hellocpp/src/main.cpp</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &quot;HelloWorld.h&quot;</span></span>
<span class="line"><span>#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>extern &quot;C&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>        int hellocpp_main(void)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                CHelloWorld *pHelloWorld = new CHelloWorld();</span></span>
<span class="line"><span>                pHelloWorld-&gt;HelloWorld();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                CHelloWorld helloWorld;</span></span>
<span class="line"><span>                helloWorld.HelloWorld();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                delete pHelloWorld;</span></span>
<span class="line"><span>                return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>hellocpp/src/HelloWorld.h</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifndef HELLOWORLD_H_</span></span>
<span class="line"><span>#define HELLOWORLD_H_</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &quot;nuttx/config.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class CHelloWorld</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>        public:</span></span>
<span class="line"><span>                CHelloWorld();</span></span>
<span class="line"><span>                ~CHelloWorld();</span></span>
<span class="line"><span>                bool HelloWorld(void);</span></span>
<span class="line"><span>        private:</span></span>
<span class="line"><span>                int mSecret;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#endif</span></span></code></pre></div><ul><li>hellocpp/src/HelloWorld.cpp</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;cstdio&gt;</span></span>
<span class="line"><span>#include &lt;string&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &quot;HelloWorld.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CHelloWorld::CHelloWorld() {</span></span>
<span class="line"><span>        mSecret = 42;</span></span>
<span class="line"><span>        std::printf(&quot;Constructor: mSecret=%d\\n&quot;,mSecret);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CHelloWorld::~CHelloWorld() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool CHelloWorld::HelloWorld(void) {</span></span>
<span class="line"><span>        std::printf(&quot;HelloWorld: mSecret=%d\\n&quot;,mSecret);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        std::string sentence = &quot;Hello&quot;;</span></span>
<span class="line"><span>        std::printf(&quot;TEST=%s\\n&quot;,sentence.c_str());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (mSecret == 42) {</span></span>
<span class="line"><span>                std::printf(&quot;CHelloWorld: HelloWorld: Hello, world!\\n&quot;);</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>                std::printf(&quot;CHelloWorld: HelloWorld: CONSTRUCTION FAILED!\\n&quot;);</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2><p>To launch build, you use the cmake procedure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> mkdir build</span></span>
<span class="line"><span> cd build</span></span>
<span class="line"><span> cmake ..</span></span>
<span class="line"><span> make</span></span></code></pre></div><p>And finally a bin file will be created to be loaded on the board.</p>`,27)]))}const E=n(l,[["render",i]]);export{u as __pageData,E as default};
