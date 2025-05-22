import{_ as t,c as i,al as n,j as s,a,o as p}from"./chunks/framework.NFAqBSgQ.js";const _=JSON.parse('{"title":"OS Data Structures","description":"","frontmatter":{},"headers":[],"relativePath":"en/reference/user/structures.md","filePath":"en/reference/user/structures.md"}'),l={name:"en/reference/user/structures.md"};function c(r,e,o,u,d,h){return p(),i("div",null,e[0]||(e[0]=[n('<h1 id="os-data-structures" tabindex="-1">OS Data Structures <a class="header-anchor" href="#os-data-structures" aria-label="Permalink to &quot;OS Data Structures&quot;">​</a></h1><h2 id="scalar-types" tabindex="-1">Scalar Types <a class="header-anchor" href="#scalar-types" aria-label="Permalink to &quot;Scalar Types&quot;">​</a></h2><p>Many of the types used to communicate with NuttX are simple scalar types. These types are used to provide architecture independence of the OS from the application. The scalar types used at the NuttX interface include:</p><h2 id="hidden-interface-structures" tabindex="-1">Hidden Interface Structures <a class="header-anchor" href="#hidden-interface-structures" aria-label="Permalink to &quot;Hidden Interface Structures&quot;">​</a></h2><p>Several of the types used to interface with NuttX are structures that are intended to be hidden from the application. From the standpoint of the application, these structures (and structure pointers) should be treated as simple handles to reference OS resources. These hidden structures include:</p><p>In order to maintain portability, applications should not reference specific elements within these hidden structures. These hidden structures will not be described further in this user&#39;s manual.</p><h2 id="access-to-the-errno-variable" tabindex="-1">Access to the <code>errno</code> Variable <a class="header-anchor" href="#access-to-the-errno-variable" aria-label="Permalink to &quot;Access to the `errno` Variable&quot;">​</a></h2><p>A pointer to the thread-specific <code>errno</code> value is available through a function call:</p><h2 id="user-interface-structures" tabindex="-1">User Interface Structures <a class="header-anchor" href="#user-interface-structures" aria-label="Permalink to &quot;User Interface Structures&quot;">​</a></h2>',9),s("p",null,[a(":c"),s("code",{class:"interpreted-text",role:"type"},"main_t"),a(" defines the type of a task entry point. :c"),s("code",{class:"interpreted-text",role:"type"},"main_t"),a(" is declared in "),s("code",null,"sys/types.h"),a(".")],-1),n(`<p>This structure is used to pass scheduling priorities to and from NuttX:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct sched_param</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> int sched_priority;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>This structure is used to pass timing information between the NuttX and a user application:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct timespec</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> time_t tv_sec;  /* Seconds */</span></span>
<span class="line"><span> long   tv_nsec; /* Nanoseconds */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>This structure is used to communicate message queue attributes between NuttX and a MoBY application:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct mq_attr {</span></span>
<span class="line"><span> size_t       mq_maxmsg;   /* Max number of messages in queue */</span></span>
<span class="line"><span> size_t       mq_msgsize;  /* Max message size */</span></span>
<span class="line"><span> unsigned     mq_flags;    /* Queue flags */</span></span>
<span class="line"><span> size_t       mq_curmsgs;  /* Number of messages currently in queue */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>The following structure defines the action to take for given signal:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct sigaction</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> union</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>   void (*_sa_handler)(int);</span></span>
<span class="line"><span>   void (*_sa_sigaction)(int, siginfo_t *, void *);</span></span>
<span class="line"><span> } sa_u;</span></span>
<span class="line"><span> sigset_t           sa_mask;</span></span>
<span class="line"><span> int                sa_flags;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>#define sa_handler   sa_u._sa_handler</span></span>
<span class="line"><span>#define sa_sigaction sa_u._sa_sigaction</span></span></code></pre></div><p>The following types is used to pass parameters to/from signal handlers:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct siginfo</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> int          si_signo;</span></span>
<span class="line"><span> int          si_code;</span></span>
<span class="line"><span> union sigval si_value;</span></span>
<span class="line"><span>} siginfo_t;</span></span></code></pre></div><p>This defines the type of the struct siginfo si_value field and is used to pass parameters with signals.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>union sigval</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> int   sival_int;</span></span>
<span class="line"><span> void *sival_ptr;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>The following is used to attach a signal to a message queue to notify a task when a message is available on a queue.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct sigevent</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> int          sigev_signo;</span></span>
<span class="line"><span> union sigval sigev_value;</span></span>
<span class="line"><span> int          sigev_notify;</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,14)]))}const m=t(l,[["render",c]]);export{_ as __pageData,m as default};
