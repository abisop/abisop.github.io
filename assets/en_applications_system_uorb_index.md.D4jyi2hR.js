import{_ as t,c as a,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"uorb uorb(micro object request broker)","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/system/uorb/index.md","filePath":"en/applications/system/uorb/index.md"}'),i={name:"en/applications/system/uorb/index.md"};function r(s,e,c,d,l,u){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="uorb-uorb-micro-object-request-broker" tabindex="-1"><code>uorb</code> uorb(micro object request broker) <a class="header-anchor" href="#uorb-uorb-micro-object-request-broker" aria-label="Permalink to &quot;\`uorb\` uorb(micro object request broker)&quot;">​</a></h1><p><code>uORB (Micro Object Request Broker)</code> is a crucial middleware in the open-source flight control system PX4. It is a pub-sub-based message bus primarily responsible for data transmission between multiple modules. Based on a lock-free design philosophy, uORB internally implements Inter-Process Communication (IPC) among tasks through shared memory and achieves low-latency data exchange with an optimal memory footprint. Its implementation does not rely on threads or work queues.</p><p>The main concepts related to uORB include <code>roles</code>, and <code>device nodes</code>.</p><h2 id="roles" tabindex="-1"><strong>Roles</strong> <a class="header-anchor" href="#roles" aria-label="Permalink to &quot;**Roles**&quot;">​</a></h2><p>In the uORB bus, there are two roles: subscribers and advertisers. The transmitted content is referred to as a topic message, described by its metadata (meta), including name, size, etc.</p><p>Each topic supports multiple instances, with the advertiser frequency being the sampling rate (interval) and the maximum publication delay being the batch latency.</p><p>For example, if the accelerometer sensor has a sampling rate of 50Hz and a maximum publication delay of 100ms, the hardware generates an interrupt every 100ms, publishing 5 data points each time (100/(1000/50)).</p><h2 id="two-types" tabindex="-1"><strong>Two Types</strong> <a class="header-anchor" href="#two-types" aria-label="Permalink to &quot;**Two Types**&quot;">​</a></h2><p>Additionally, NuttX categorizes topics into two types: <strong>notification</strong> topics and <strong>general</strong> topics.</p><p>Subscribers to <strong>notification</strong> topics are not concerned with the presence of an advertiser or whether a publication has occurred; they directly obtain the current state.When an application subscribes, it directly obtains the latest data from the current device node as the current state.</p><p>Subscribers to <strong>general</strong> topics are not concerned with past states; the data they obtain must be current or future occurrences. For example, with an accelerometer sensor, an application only cares about the data reported by the next data ready interrupt from the sensor, rather than data from a past moment.</p><p>To publish <strong>notification</strong> topic messages, APIs with the <strong>persist</strong> suffix are used for topic publication, and subscriber behavior is consistent with that of <strong>general</strong> topics.</p><h2 id="device-nodes" tabindex="-1"><strong>Device Nodes</strong> <a class="header-anchor" href="#device-nodes" aria-label="Permalink to &quot;**Device Nodes**&quot;">​</a></h2><p>Each topic being published or subscribed to corresponds to a character device node, with subscribers and advertisers sharing data through an internal circular buffer. In implementation, a caller who opens a device node in O_WRONLY mode is considered an advertiser, and one who opens it in O_RDONLY mode is considered a subscriber.</p><p>The advertiser writes to the node to publish data, while the subscriber reads from the node to subscribe to data. Both parties can use poll to monitor the node to receive events of interest. Control over device nodes by advertisers and subscribers is achieved through ioctl operations.</p><h2 id="code-location" tabindex="-1"><strong>Code Location</strong> <a class="header-anchor" href="#code-location" aria-label="Permalink to &quot;**Code Location**&quot;">​</a></h2><p>The directory apps/system/uorb contains the uORB wrapper, unit tests, physical sensor topic definitions, and the uorb_listener tool.</p><pre><code>├── Kconfig
├── listener.c   // Implementation of uorb_listener.c
├── Make.defs
├── Makefile
├── sensor       // Definitions for physical sensor topics
│   ├── accel.c
│   ├── accel.h
│   ├── baro.c
│   ├── baro.h
│   ├── cap.c
│   ├── cap.h
│   ├── ...c
│   ├── tvoc.c
│   ├── tvoc.h
│   ├── uv.c
│   └── uv.h
├── test
│   ├── unit_test.c   // Unit tests for uORB
│   ├── utility.c
│   └── utility.h
└── uORB
    ├── uORB.c   // Implementation of uORB wrapper
    └── uORB.h
</code></pre><h2 id="introduction-to-key-data-structures" tabindex="-1"><strong>Introduction to Key Data Structures</strong> <a class="header-anchor" href="#introduction-to-key-data-structures" aria-label="Permalink to &quot;**Introduction to Key Data Structures**&quot;">​</a></h2><p>Each uORB topic corresponds to a <code>struct orb_metadata</code> structure, which is used to describe the metadata of the topic, including the name o_name, the message size o_size, and the debug format pointer o_format.</p><pre><code>struct orb_metadata
{
  FAR const char   *o_name;       // Name of the topic
  uint16_t          o_size;       // Size of the message
  #ifdef CONFIG_DEBUG_UORB
  FAR const char   *o_format;     //  Format string used for structure input and output
  #endif
};

typedef FAR const struct orb_metadata *orb_id_t; // Pointer to orb_metadata as an identifier for uORB topics
</code></pre><p>After advertising or subscribing to each uORB topic, the caller can obtain the topic&#39;s state by calling orb_get_state, which includes the current maximum publication frequency max_frequency, the minimum batch interval min_batch_interval, the length of the internal circular queue queue_size, the number of subscribers nsubscribers, and the generation index for the main thread generation.</p><pre><code>struct orb_state              
{                             
  uint32_t max_frequency;     // Maximum publication frequency
  uint32_t min_batch_interval;// Minimum batch interval
  uint32_t queue_size;        // Length of the internal circular queue
  uint32_t nsubscribers;      // Number of subscribers
  uint64_t generation;        // Generation index for the main thread
};
</code></pre><p>uORB supports the instantiation of a topic into multiple entities, each with a corresponding instance number starting from 0 and incrementing. struct orb_object contains information about one such entity: its metadata meta and instance number instance.</p><pre><code>struct orb_object
{
  orb_id_t meta;      // Pointer to the metadata of the topic
  int      instance;  // Instance number of the topic entity
};
</code></pre><h2 id="topic-definition" tabindex="-1"><strong>Topic Definition</strong> <a class="header-anchor" href="#topic-definition" aria-label="Permalink to &quot;**Topic Definition**&quot;">​</a></h2><p>A large number of uORB topics are defined in PX4 at <a href="https://docs.px4.io/main/en/middleware/uorb_graph.html" target="_blank" rel="noreferrer">https://docs.px4.io/main/en/middleware/uorb_graph.html</a>.</p><p>Defining a new topic involves creating the topic&#39;s data structure, declaring a global variable for the topic&#39;s metadata, and optionally defining a debug output function for the topic&#39;s data. Three macros are frequently used in the definition process:</p><p><code>ORB_ID</code>: Used to obtain the global metadata handle for the topic.</p><p><code>ORB_DECLARE</code>: Used to declare the global metadata for the topic.</p><p><code>ORB_DEFINE</code>: Used to define the global metadata for the topic.</p><h2 id="api-description" tabindex="-1"><strong>API Description</strong> <a class="header-anchor" href="#api-description" aria-label="Permalink to &quot;**API Description**&quot;">​</a></h2><p>The uORB has a total of 30 APIs, which can be categorized into four groups: advertiser class, subscriber class, general API class, and tool class. Almost all of these APIs operate using file descriptors, so special attention should be paid to avoid using them across processes (tasks).</p><h3 id="advertise-class-apis" tabindex="-1"><strong>Advertise Class APIs</strong> <a class="header-anchor" href="#advertise-class-apis" aria-label="Permalink to &quot;**Advertise Class APIs**&quot;">​</a></h3><h4 id="advertise-topic-for-notification-types" tabindex="-1"><strong>Advertise Topic for Notification Types</strong> <a class="header-anchor" href="#advertise-topic-for-notification-types" aria-label="Permalink to &quot;**Advertise Topic for Notification Types**&quot;">​</a></h4><p>This category includes a total of 5 APIs, among which orb_advertise, orb_advertise_queue, and orb_advertise_multi are internally implemented based on orb_advertise_multi_queue. They are permutations and combinations of the parameters data, instance, and queue_size.</p><p><code>orb_advertise_multi_queue</code> requires specifying the topic metadata meta, the initial data data, the instance instance, and the internal queue size when advertising a topic. Upon success, it returns a file descriptor; upon failure, it returns -1 and sets errno.</p><p>The instance is a pointer to an input parameter. If it is NULL, the instance will increment from its existing value. Otherwise, the content pointed to by *instance will be used for advertising.</p><p>Multiple advertisements for the same topic instance are supported, allowing for multiple publishers on a single device node.</p><pre><code>int orb_advertise_multi_queue(FAR const struct orb_metadata *meta,
                              FAR const void *data,               
                              FAR int *instance,                  
                              unsigned int queue_size);  

static inline int orb_advertise(FAR const struct orb_metadata *meta,
                                FAR const void *data)
{
  int instance = 0;

  return orb_advertise_multi_queue(meta, data, &amp;instance, 1);
}     

static inline int orb_advertise_queue(FAR const struct orb_metadata *meta,
                                      FAR const void *data,
                                      unsigned int queue_size)
{
  int instance = 0;

  return orb_advertise_multi_queue(meta, data, &amp;instance, queue_size);
}

static inline int orb_advertise_multi(FAR const struct orb_metadata *meta,
                                      FAR const void *data,
                                      FAR int *instance)
{
  return orb_advertise_multi_queue(meta, data, instance, 1);
}
</code></pre><p><code>orb_advertise_multi_queue_persist</code> shares the same parameters with <code>orb_advertise_multi_queue</code>, but with a different internal implementation.</p><pre><code>int orb_advertise_multi_queue_persist(FAR const struct orb_metadata *meta,
                                      FAR const void *data,
                                      FAR int *instance,
                                      unsigned int queue_size);
</code></pre><h4 id="unadvertise-a-topic" tabindex="-1"><strong>Unadvertise a Topic</strong> <a class="header-anchor" href="#unadvertise-a-topic" aria-label="Permalink to &quot;**Unadvertise a Topic**&quot;">​</a></h4><p>The <code>orb_unadvertise</code> function takes the file descriptor fd returned by a topic advertisement as its parameter and internally calls orb_close to achieve unadvertisement.</p><pre><code>static inline int orb_unadvertise(int fd)
{
  return orb_close(fd);
}
</code></pre><h4 id="publishing-topic-data" tabindex="-1"><strong>Publishing Topic Data</strong> <a class="header-anchor" href="#publishing-topic-data" aria-label="Permalink to &quot;**Publishing Topic Data**&quot;">​</a></h4><p>The <code>orb_publish</code> function takes the topic metadata meta, the advertisement handle fd, and a pointer to the data data to be published as its parameters. It can only publish one piece of data each time. In contrast, orb_publish_multi allows batch publishing. The return values of the two functions differ: orb_publish returns 0 upon success and -1 upon failure, setting errno in the latter case, while orb_publish_multi returns the length of data published upon success.</p><pre><code>ssize_t orb_publish_multi(int fd, FAR const void *data, size_t len);

static inline int orb_publish(FAR const struct orb_metadata *meta,
                              int fd, FARorb_close const void *data)
{
  int ret;

  ret = orb_publish_multi(fd, data, meta-&gt;o_size);
  return ret == meta-&gt;o_size ? 0 : -1;
}

static inline int orb_publish_auto(FAR const struct orb_metadata *meta,
                                   FAR int *fd, FAR const void *data,
                                   FAR int *instance)；
</code></pre><h3 id="subscribe-class-apis" tabindex="-1"><strong>Subscribe Class APIs</strong> <a class="header-anchor" href="#subscribe-class-apis" aria-label="Permalink to &quot;**Subscribe Class APIs**&quot;">​</a></h3><h4 id="subscribe-to-a-topic" tabindex="-1"><strong>Subscribe to a Topic</strong> <a class="header-anchor" href="#subscribe-to-a-topic" aria-label="Permalink to &quot;**Subscribe to a Topic**&quot;">​</a></h4><p>The <code>orb_subscribe</code> function is internally implemented by orb_subscribe_multi, with the main difference between them being whether an instance needs to be specified for the subscription. Upon successful subscription, it returns an fd (file descriptor); upon failure, it returns -1 and sets errno.</p><pre><code>int orb_subscribe_multi(FAR const struct orb_metadata *meta,
                        unsigned instance);

static inline int orb_subscribe(FAR const struct orb_metadata *meta)
{
  return orb_subscribe_multi(meta, 0);
}
</code></pre><h4 id="unsubscribe" tabindex="-1"><strong>Unsubscribe</strong> <a class="header-anchor" href="#unsubscribe" aria-label="Permalink to &quot;**Unsubscribe**&quot;">​</a></h4><p>The <code>orb_unsubscribe</code> function takes the fd (file descriptor) returned by a subscription as its parameter and internally calls orb_close to unsubscribe.</p><pre><code>static inline int orb_unsubscribe(int fd)
{
  return orb_close(fd);
}
</code></pre><h4 id="retrieve-data" tabindex="-1"><strong>Retrieve Data</strong> <a class="header-anchor" href="#retrieve-data" aria-label="Permalink to &quot;**Retrieve Data**&quot;">​</a></h4><p>The <code>orb_copy</code> function takes the topic metadata meta, the subscription handle fd, and a pointer to the buffer buffer where the data will be stored as its parameters. It can only read one piece of data each time. In contrast, orb_copy_multi allows batch reading. The return values of the two functions differ: orb_copy returns 0 upon success and -1 upon failure, setting errno in the latter case, while orb_copy_multi returns the length of data read upon success.</p><pre><code>ssize_t orb_copy_multi(int fd, FAR void *buffer, size_t len);

static inline int orb_copy(FAR const struct orb_metadata *meta,
                           int fd, FAR void *buffer)
{
  int ret;

  ret = orb_copy_multi(fd, buffer, meta-&gt;o_size);
  return ret == meta-&gt;o_size ? 0 : -1;
}
</code></pre><h3 id="normal-class-apis" tabindex="-1"><strong>Normal Class APIs</strong> <a class="header-anchor" href="#normal-class-apis" aria-label="Permalink to &quot;**Normal Class APIs**&quot;">​</a></h3><h4 id="open-close-device-nodes" tabindex="-1"><strong>Open/Close Device Nodes</strong> <a class="header-anchor" href="#open-close-device-nodes" aria-label="Permalink to &quot;**Open/Close Device Nodes**&quot;">​</a></h4><p><code>orb_open</code> is used to open a character device node. The parameters include name (the topic name), instance (the topic instance index), and flags (the open mode). Subscribers typically open with O_RDONLY, publishers with O_WRONLY, and a third party can open the node with &quot;0&quot; to retrieve device node information. It corresponds to <code>orb_close</code> for closing the node.</p><pre><code>int orb_open(FAR const char *name, int instance, int flags);
int orb_close(int fd);
</code></pre><h4 id="retrieve-topic-status" tabindex="-1"><strong>Retrieve Topic Status</strong> <a class="header-anchor" href="#retrieve-topic-status" aria-label="Permalink to &quot;**Retrieve Topic Status**&quot;">​</a></h4><p><code>orb_get_state</code> this function or method is not explicitly named in your list but is implied by the context.)</p><pre><code>int orb_get_state(int fd, FAR struct orb_state *state);
</code></pre><h4 id="check-for-updates" tabindex="-1"><strong>Check for Updates</strong> <a class="header-anchor" href="#check-for-updates" aria-label="Permalink to &quot;**Check for Updates**&quot;">​</a></h4><p><code>orb_check</code> is used to check if there is new data for the current topic. It takes a pointer to an updated variable as an input parameter.</p><pre><code>int orb_check(int fd, FAR bool *updated);
</code></pre><h4 id="control-the-topic" tabindex="-1"><strong>Control the Topic</strong> <a class="header-anchor" href="#control-the-topic" aria-label="Permalink to &quot;**Control the Topic**&quot;">​</a></h4><p>Applications can use <code>orb_ioctl</code> to control physical sensor topics, such as adjusting the range, resolution, etc., of accelerometers, gyroscopes, magnetometers, and PPG sensors.</p><pre><code>int orb_ioctl(int fd, int cmd, unsigned long arg);
</code></pre><h4 id="set-get-topic-batch-parameters" tabindex="-1"><strong>Set/Get Topic Batch Parameters</strong> <a class="header-anchor" href="#set-get-topic-batch-parameters" aria-label="Permalink to &quot;**Set/Get Topic Batch Parameters**&quot;">​</a></h4><p><code>orb_set_batch_interval</code>/<code>orb_get_batch_interval</code> are used to set/get the maximum delay reporting time for a topic, in microseconds (μs). This API is only applicable to physical sensors with hardware FIFO support.</p><pre><code>int orb_set_batch_interval(int fd, unsigned batch_interval);
int orb_get_batch_interval(int fd, FAR unsigned *batch_interval);
</code></pre><h4 id="set-get-topic-interval-parameters" tabindex="-1"><strong>Set/Get Topic Interval Parameters</strong> <a class="header-anchor" href="#set-get-topic-interval-parameters" aria-label="Permalink to &quot;**Set/Get Topic Interval Parameters**&quot;">​</a></h4><p>Frequency and sampling interval are reciprocals of each other. <code>orb_set_interval</code>/<code>orb_get_interval</code> are used to set/get the sampling rate, in microseconds (μs), while <code>orb_set_frequency</code>/<code>orb_get_frequency</code> are used to set/get the sampling frequency, in Hertz (Hz).</p><pre><code>int orb_set_interval(int fd, unsigned interval);
int orb_get_interval(int fd, FAR unsigned *interval);
static inline int orb_set_frequency(int fd, unsigned frequency)
static inline int orb_get_frequency(int fd, FAR unsigned *frequency)
</code></pre><h4 id="orb-flush" tabindex="-1"><strong>orb_flush</strong> <a class="header-anchor" href="#orb-flush" aria-label="Permalink to &quot;**orb\\_flush**&quot;">​</a></h4><p><code>orb_flush</code> supports the flush operation for topics with hardware FIFO. After the flush operation is completed, a POLLPRI event will be generated for the fd, and then orb_get_events can be called to retrieve the corresponding event.</p><pre><code>int orb_flush(int fd);
</code></pre><h4 id="orb-get-events" tabindex="-1"><strong>orb_get_events</strong> <a class="header-anchor" href="#orb-get-events" aria-label="Permalink to &quot;**orb\\_get\\_events**&quot;">​</a></h4><p><code>orb_get_events</code> retrieves events. Currently, the supported events include ORB_EVENT_FLUSH_COMPLETE.</p><pre><code>int orb_get_events(int fd, FAR unsigned int *events);
</code></pre><h3 id="tool-class-apis" tabindex="-1"><strong>Tool Class APIs</strong> <a class="header-anchor" href="#tool-class-apis" aria-label="Permalink to &quot;**Tool Class APIs**&quot;">​</a></h3><h4 id="check-if-a-publisher-exists-for-a-topic" tabindex="-1"><strong>Check if a Publisher Exists for a Topic</strong> <a class="header-anchor" href="#check-if-a-publisher-exists-for-a-topic" aria-label="Permalink to &quot;**Check if a Publisher Exists for a Topic**&quot;">​</a></h4><p><code>orb_exists</code> is used to check if there is a publisher for a topic. It takes the topic metadata meta and the topic instance index instance as parameters. It returns 0 if the check is successful and an ERROR code if it fails.</p><pre><code>int orb_exists(FAR const struct orb_metadata *meta, int instance);
</code></pre><h4 id="timestamp-calculation" tabindex="-1"><strong>Timestamp Calculation</strong> <a class="header-anchor" href="#timestamp-calculation" aria-label="Permalink to &quot;**Timestamp Calculation**&quot;">​</a></h4><p><code>orb_absolute_time</code> returns the current timestamp. <code>orb_elapsed_time</code> returns the difference between two timestamps.</p><pre><code>orb_abstime orb_absolute_time(void);
static inline orb_abstime orb_elapsed_time(FAR const orb_abstime *then)
</code></pre><h4 id="get-the-number-of-topic-instances" tabindex="-1"><strong>Get the Number of Topic Instances</strong> <a class="header-anchor" href="#get-the-number-of-topic-instances" aria-label="Permalink to &quot;**Get the Number of Topic Instances**&quot;">​</a></h4><p><code>orb_group_count</code> returns the number of instances for a specific topic.</p><pre><code>int orb_group_count(FAR const struct orb_metadata *meta);
</code></pre><h4 id="get-topic-metadata" tabindex="-1"><strong>Get Topic Metadata</strong> <a class="header-anchor" href="#get-topic-metadata" aria-label="Permalink to &quot;**Get Topic Metadata**&quot;">​</a></h4><p><code>orb_get_meta</code> is used to retrieve a pointer to the topic metadata by using a string. Currently, this function has significant limitations: for non-physical sensors, you must explicitly subscribe to or advertise the topic to successfully obtain the metadata pointer.</p><pre><code>FAR const struct orb_metadata *orb_get_meta(FAR const char *name);
</code></pre><p>These tool class APIs provide additional utilities for working with ORB (Object Request Broker) topics, allowing for tasks such as checking the existence of publishers, calculating timestamps, retrieving the number of topic instances, and accessing topic metadata. These functions are crucial for managing and interacting with topics in an ORB-based system.</p><h2 id="usage-in-nuttx" tabindex="-1"><strong>Usage in NuttX</strong> <a class="header-anchor" href="#usage-in-nuttx" aria-label="Permalink to &quot;**Usage in NuttX**&quot;">​</a></h2><p>In NuttX, all physical sensor drivers automatically advertise their topics upon system startup. The sensors are then controlled to turn on or off based on whether any applications have subscribed to the related topics, enabling intelligent low-power consumption management.</p><p>All virtual topics (algorithms, states, cross-core topics) automatically register character device nodes upon their first publication or subscription. Once registered, these nodes remain active even if the publication or subscription is later canceled.</p><p>When subscribers and publishers in an application need to monitor each other&#39;s status, the poll function is used for status notifications. Subscribers and publishers synchronize their status via the POLLPRI signal. When a publisher publishes data, a POLLIN event is generated to notify all subscribers. POLLPRI events are triggered in the following scenarios:</p><p>When a new subscriber or publisher joins the topic.</p><p>When a subscriber sets the sampling rate or batch parameters for the topic.</p><p>When a subscriber or publisher leaves the topic.</p><p>Whenever a POLLPRI event occurs, you can call orb_get_state to retrieve the current status of the topic, including the maximum publishing frequency (max_frequency), the minimum batch interval (min_batch_interval), the internal ring buffer size (queue_size), the number of subscribers (nsubscribers), and the data generation count.</p><p>In summary, if subscribers and publishers are interdependent, it is recommended to use a polling or libuv-based programming structure. If they are independent, a notification-based topic approach is preferred.</p><h3 id="fusion-algorithm-models" tabindex="-1"><strong>Fusion Algorithm Models</strong> <a class="header-anchor" href="#fusion-algorithm-models" aria-label="Permalink to &quot;**Fusion Algorithm Models**&quot;">​</a></h3><p>If multiple applications are interconnected, with one serving as the input and another as the output, shared topics can be established to facilitate decoupling between applications. For example, a calibration algorithm module can subscribe to an uncalibrated sensor data topic and publish calibrated sensor data. A motion algorithm module can subscribe to both calibrated and uncalibrated data to generate algorithmic topics, with multiple applications ignoring each other&#39;s existence.</p><h3 id="subscriber-and-publisher-monitoring" tabindex="-1"><strong>Subscriber and Publisher Monitoring</strong> <a class="header-anchor" href="#subscriber-and-publisher-monitoring" aria-label="Permalink to &quot;**Subscriber and Publisher Monitoring**&quot;">​</a></h3><p>Subscribers can check for update events via POLLIN events, while publishers can monitor changes in subscriber count, sampling rates, and other statuses via POLLPRI events. The optimal status can be obtained using orb_get_state. By leveraging these mechanisms, NuttX provides a robust framework for efficient data communication and management in an embedded system environment.</p><h2 id="tools" tabindex="-1"><strong>Tools</strong> <a class="header-anchor" href="#tools" aria-label="Permalink to &quot;**Tools**&quot;">​</a></h2><h3 id="uorb-listener" tabindex="-1"><strong>uorb_listener</strong> <a class="header-anchor" href="#uorb-listener" aria-label="Permalink to &quot;**uorb\\_listener**&quot;">​</a></h3><p><code>uorb_listener</code> is a testing tool located above the uORB layer. It calls the uORB API to subscribe to and obtain topic information, further verifying whether the underlying system is functioning correctly. uorb_listener only monitors topics that have been advertised. The entire listening process can be paused using Ctrl+C. Usage instructions can be viewed by running uorb_listener -h. Below are some commonly used cases:</p><pre><code>listener &lt;command&gt; [arguments...]
 Commands:
        &lt;topics_name&gt; Topic name. Multi name are separated by &#39;,&#39;
        [-h       ]  Listener commands help
        [-f       ]  Record uorb data to file
        [-n &lt;val&gt; ]  Number of messages, default: 0
        [-r &lt;val&gt; ]  Subscription rate (unlimited if 0), default: 0
        [-b &lt;val&gt; ]  Subscription maximum report latency in us(unlimited if 0), default: 0
        [-t &lt;val&gt; ]  Time of listener, in seconds, default: 5
        [-T       ]  Top, continuously print updating objects
        [-l       ]  Top only execute once.
</code></pre><p><code>uorb_listener</code> continuously prints information for all topics at the frequency of topic publications.</p><p><code>uorb_listener -f</code> continuously saves information for all topics to /data/uorb/<strong>*/</strong>*.csv at the frequency of topic publications. If the -f flag is used and the file cannot be created, the data will be output to the terminal instead.</p><p><code>uorb_listener -f sensor_accel0</code> continuously saves information for the specified topic to a file at the frequency of topic publications.</p><p><code>uorb_listener n 1</code> prints a snapshot of the current information for all topics.</p><p><code>uorb_listener n</code> num prints information for all topics until num messages have been received, at the frequency of topic publications.</p><p><code>uorb_listener r 1</code> prints information for all topics at a frequency of 1Hz.</p><p><code>uorb_listener r x n</code> num prints information for all topics at a frequency of xHz until num messages have been received.</p><p><code>uorb_listener [specified_topic_list] r 1</code> continuously prints information for the specified topics at a frequency of 1Hz. In the specified topic list, topics are separated by commas (,). Each entry can be a topic name, such as sensor_accel, which will print information for all instances of that topic. It can also be a topic instance name, such as sensor_mag0, which will only print information for that specific topic instance.</p><p>This tool provides a flexible way to monitor and log uORB topic data, aiding in the debugging and verification of the system&#39;s behavior.</p><h3 id="generator-debugging-tool-instructions" tabindex="-1"><strong>Generator Debugging Tool Instructions</strong> <a class="header-anchor" href="#generator-debugging-tool-instructions" aria-label="Permalink to &quot;**Generator Debugging Tool Instructions**&quot;">​</a></h3><p><code>uorb_generator</code> this tool can be used in conjunction with <code>uorb_listener</code>.</p><p>Before using the tool, it is necessary to set the CONFIG_LINE_MAX parameter to a sufficiently long length to ensure that the terminal can accept complete input data. A recommendation is to set it to 256 or 512.</p><p>Incoming data can be printed via uorb_listener or concatenated manually using format information, but it must be ensured that the string and struct information are consistent. Topics saved using uorb_listener -f can be pulled and imported into the simulator for debugging (mount -t hostfs -o fs=/home/xxx/ /data).</p><p><strong>Parameter Description:</strong></p><p><code>-f</code> specifies the path to the input playback file. <code>-n</code> specifies the number of times to playback the data. This option is only effective when -s is enabled. <code>-r</code> specifies the playback frequency (in HZ, e.g., 5hz, 20hz). This option is only effective when -s is enabled. <code>-t</code> specifies the topic for playback, with the option to specify a specific instance value afterward. <code>-s</code> enables playback of simulated (fake) data, generating struct data from input entered via the terminal. It will modify the timestamp of the current data to real-time. Simulated data should be placed at the end of the entire command.</p><p>By following these instructions, users can effectively utilize the Generator debugging tool in conjunction with uorb_listener for system debugging and verification.</p><pre><code>The tool publishes topic data via uorb.
Notice:LINE_MAX must be set to 128 or more.

generator &lt;command&gt; [arguments...]
  Commands:
    &lt;topics_name&gt; The playback topic name.
    [-h       ]  Listener commands help.
    [-f &lt;val&gt; ]  File path to be played back(absolute path).
    [-n &lt;val&gt; ]  Number of playbacks(fake model), default: 1
    [-r &lt;val&gt; ]  The rate for playing fake data is only valid when parameter &#39;s&#39; is used. 
                 default:10hz.
    [-s &lt;val&gt; ]  Playback fake data.
    [-t &lt;val&gt; ]  Playback topic.
     e.g.:
        sim - sensor_accel0:
          uorb_generator -n 100 -r 5 -s -t sensor_accel0 timestamp:23191100,x:0.1,y:9.7,z:0.81,temperature:22.15

        sim - sensor_baro0:
          uorb_generator -n 100 -r 5 -s -t sensor_baro0 timestamp:23191100,pressure:999.12,temperature:26.34

        fies - sensor_accel1
        uorb_generator -f /data/uorb/20240823061723/sensor_accel0.csv -t sensor_accel1
</code></pre>`,131)]))}const b=t(i,[["render",r]]);export{h as __pageData,b as default};
