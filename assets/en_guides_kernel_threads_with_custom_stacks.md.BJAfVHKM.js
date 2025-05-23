import{_ as s,c as e,al as n,o as t}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"Kernel Threads with Custom Stacks","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/kernel_threads_with_custom_stacks.md","filePath":"en/guides/kernel_threads_with_custom_stacks.md"}'),l={name:"en/guides/kernel_threads_with_custom_stacks.md"};function p(i,a,c,o,r,h){return t(),e("div",null,a[0]||(a[0]=[n(`<h1 id="kernel-threads-with-custom-stacks" tabindex="-1">Kernel Threads with Custom Stacks <a class="header-anchor" href="#kernel-threads-with-custom-stacks" aria-label="Permalink to &quot;Kernel Threads with Custom Stacks&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/display/NUTTX/Kernel+Threads+with+Custom+Stacks" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Kernel+Threads+with+Custom+Stacks</a></p><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>Under certain conditions, it may be necessary to create a kernel thread whose stack lives in some custom memory. This page provides and example of how that would be done:</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>Here is the body of some function. It expects to have the following inputs:</p><ol><li><code>taskname</code>: The name of the kernel thread to be started</li><li><code>stacksize</code>: The size of the custom stack</li><li><code>priority</code>: The priority of the kernel thread to be started</li><li><code>entry_point</code>: The entry point of the kernel thread to be started</li><li><code>argv</code>: An optional array of argument strings passed to the kernel thread</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Allocate a TCB for the new kernel thread.  kmm_zalloc() is</span></span>
<span class="line"><span>* used to that all fields of the new TCB will be zeroed.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tcb = (FAR struct task_tcb_s *)kmm_zalloc(sizeof(struct task_tcb_s));</span></span>
<span class="line"><span>if (tcb == NULL)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return -ENOMEM;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Indicate (1) that this is a kernel thread and that (2) a custom</span></span>
<span class="line"><span>* stack will be used.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tcb-&gt;flags = TCB_FLAG_TTYPE_KERNEL | TCB_FLAG_CUSTOM_STACK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Allocate the custom stack for the new kernel thread.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Do whatever it takes to get a reference to the custom stack.</span></span>
<span class="line"><span>* Here custom_alloc() is used as a placeholder for whatever</span></span>
<span class="line"><span>* that may be.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stack = (FAR uint32_t *)custom_alloc(stacksize);</span></span>
<span class="line"><span>if (stack == NULL)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    kmm_free(tcb);</span></span>
<span class="line"><span>    return -ENOMEM;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Initialize the TCB.  This will initialize all remaining</span></span>
<span class="line"><span>* fields of the TCB, associate the stack to the TCB, allocate</span></span>
<span class="line"><span>* any additional resources needed by the kernel thread, and</span></span>
<span class="line"><span>* place the TCB in a list of inactive tasks.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = task_init((FAR struct tcb_s *)tcb, progname, priority,</span></span>
<span class="line"><span>                stack, stacksize, entry_point, argv);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    kmm_free(tcb);</span></span>
<span class="line"><span>    custom_free(stack);</span></span>
<span class="line"><span>    return ret;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Then activate the kernel thread at the provided priority */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = task_activate((FAR struct tcb_s *)tcb);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    /* nxtask_unit() will undo all of the operations of nxtask_init().</span></span>
<span class="line"><span>    * It also has the side-effect of freeing the TCB which it assumes</span></span>
<span class="line"><span>    * was allocated with one of the kmm_malloc()functions.</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    nxtask_uninit(tcb);</span></span>
<span class="line"><span>    custom_free(stack);</span></span>
<span class="line"><span>    return ret;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>return OK;</span></span></code></pre></div><h2 id="freeing-the-tcb" tabindex="-1">Freeing the TCB <a class="header-anchor" href="#freeing-the-tcb" aria-label="Permalink to &quot;Freeing the TCB&quot;">​</a></h2><p>Prior to calling <code>nxtask_init()</code>, the TCB can be freed using the kmm allocator, specifically the function <code>kmm_free()</code>. However, after <code>nxtask_init()</code> is called, additional resources will be associated with the TCB and you must then call <code>nxtask_uninit()</code> to free the TCB and all of its associated resources. <code>kmm_free()</code> will be used internally by <code>nxtask_uninit()</code> to free the TCB. Note that in any event, the TCB must be allocated with one of the <code>kmm_malloc()</code> allocation functions.</p><p>You must never free the TCB after <code>nxtask_activate()</code> returns successfully.</p><h2 id="freeing-the-custom-stack-memory" tabindex="-1">Freeing the Custom Stack Memory <a class="header-anchor" href="#freeing-the-custom-stack-memory" aria-label="Permalink to &quot;Freeing the Custom Stack Memory&quot;">​</a></h2><p>The effect of the <code>TCB_FLAG_CUSTOM_STACK</code> flag is that the OS will not attempt to free the custom stack memory if the kernel thread exits, crashes, or is killed. Does this matter in your implementation? Could this result in some kind of memory leak? If any kind of clean-up is required by your application to free the custom stack memory, you will probably want to use an <code>on_exit()</code> or <code>atexit()</code> function to get a callback when the kernel thread is terminated.</p><p>If <code>TCB_FLAG_CUSTOM_STACK</code> were not set in the TCB flags, the OS would attempt to free the stack using <code>kmm_free()</code> which is probably not what you want in this case.</p><p>The actual logic is a slightly more complex and somewhat redundant:</p><ul><li>If <code>TCB_FLAG_CUSTOM_STACK</code> is set in the TCB flags, no attempt will be made to free the custom stack.</li><li>If <code>TCB_FLAG_CUSTOM_STACK</code> is not set in the TCB flags, the stack will be de-allocated for the kernel thread only if the stack lies in the kernel memory pool.</li></ul><p>So in reality <code>TCB_FLAG_CUSTOM_STACK</code> may not be necessary. But the safest option is to include it in all cases where you do not expect the custom stack to be de-allocated.</p><p>You must not free the custom stack after <code>nxtask_activate()</code> returns successfully and until the kernel thread is terminated.</p>`,19)]))}const m=s(l,[["render",p]]);export{u as __pageData,m as default};
