<script src="https://unpkg.com/gsap@3.11.5/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/gsap@3.11.5/dist/gsap.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/EasePack.min.js"></script>
<script src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/SplitText.min.js"></script>
<script src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/ScrambleTextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script>

<!-- Unicorn Studio -->
<script src="https://cdn.unicorn.studio/v1.3.1/unicornStudio.umd.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
    UnicornStudio.init();
});
</script>
<!-- Unicorn Studio End -->

<!-- Utils -->
<script>
    function debounce(func, delay) {
    let timeout;
    return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
};
}
</script>
<!-- Utils End -->

<script>

    const isChromium = !!window.chrome;
    const body = document.querySelector("body");
    isChromium
    ? body.classList.add("is-chromium-browser")
    : body.classList.add("is-other-browser");
    if(!!window.InternalError) {body.classList.add("is-firefox-browser")};
    let lenis;

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
    if (Webflow.env("editor") === undefined) {
    lenis = new Lenis();

    function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
    requestAnimationFrame(raf);

    function connectToScrollTrigger() {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
}
    // Uncomment this if using GSAP ScrollTrigger
    connectToScrollTrigger();
}
}
    const FLICKER_EASE =
    "rough({template: circ.easeOut, strength: 4, points: 50, taper: 'out', randomize: true, clamp: true})";
    const SCRAMBLE_CHAR_SET = "021ZROTXINSOPSEKN";

    /* scramble text on scroll */
    document.addEventListener("DOMContentLoaded", () => {
    function scrollAnimFunc() {
        const animTriggers = document.querySelectorAll("[anim-trigger]");
        animTriggers.forEach((item) => {
            // Capture original inline styles to revert back after scrambling
            const originalStyle = {
                width: item.style.width,
                height: item.style.height,
            };

            // Capture computed width and height (actual dimensions before scrambling)
            const originalWidth = window.getComputedStyle(item).width;
            const originalHeight = window.getComputedStyle(item).height;

            // Temporarily set the item to fixed width and height
            item.style.width = originalWidth;
            item.style.height = originalHeight;

            let itemTl = gsap.timeline({
                paused: true,
                onComplete: () => {
                    split.revert();
                    // Revert width and height to original values after the animation
                    item.style.width = originalStyle.width;
                    item.style.height = originalStyle.height;
                },
            });
            let split = new SplitText(item, {type: "words, chars"});
            // Flicker animation on individual characters
            itemTl.from(
                split.chars,
                {
                    autoAlpha: 0,
                    duration: 0.4,
                    stagger: {each: 0.05, from: "random"},
                    ease: FLICKER_EASE,
                },
                0 // Start at time 0
            );

            // Scramble text animation on individual characters running at the same time
            itemTl.to(
                split.chars, // Apply scramble to individual characters
                {
                    scrambleText: {
                        chars: SCRAMBLE_CHAR_SET, // Scramble characters
                        text: "{original}", // Original text it scrambles back to
                        speed: 2, // Scramble speed
                        delimiter: "", // Delimiter between scrambled characters
                    },
                    duration: 0.8,
                },
                0
            ); // This 0 means start the scramble animation at the same time as flicker

            ScrollTrigger.create({
                trigger: item,
                start: "top 92%",
                onEnter: () => {
                    setTimeout(() => {
                        item.classList.add("is-animated");
                        itemTl.timeScale(1).play();
                    }, 300);
                },
            });
        });
    }
    scrollAnimFunc();
    /* onscroll refresh trigger */
    const refreshTrigger = document.querySelectorAll("[refresh-trigger]");
    refreshTrigger.forEach((item) => {
    ScrollTrigger.create({
    trigger: item,
    start: "top 90%",
    end: "top center",
    toggleActions: "restart pause resume pause",
    onEnter: () => {
    ScrollTrigger.refresh();
},
});
});
});
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
    const preloaderEditor = document.querySelector("#preloader");

    // Check if in Webflow Editor
    if (Webflow.env("editor")) {
    console.log("In Webflow Editor, skipping preloader.");
    if (preloaderEditor) {
    preloaderEditor.style.display = "none";
}
    return;
}

    // Check if the animation has already been shown during this session
    if (sessionStorage.getItem("preloadAnimationShown") === "true") {
    if (preloaderEditor) {
    preloaderEditor.style.display = "none";
}
    return;
}

    // Mark the animation as shown in sessionStorage
    sessionStorage.setItem("preloadAnimationShown", "true");

    function wrapTextInSpans(selector, index) {
    const element = document.querySelector(selector);

    // Check if the element exists
    if (element) {
    // Check if the element already has a span inside it
    const existingSpan = element.querySelector("span");

    if (!existingSpan) {
    // If no span exists, wrap the entire text in a single span
    const textContent = element.innerText; // Get the current text
    element.innerHTML = ""; // Clear the current content

    // Create a new span element
    const span = document.createElement("span");
    span.innerText = textContent; // Set the text content
    span.id = `zeroText${index}`; // Assign unique ID without replacing

    // Append the span to the element
    element.appendChild(span);
}
} else {
    console.error(`Element with selector ${selector} not found.`);
}
}

    setTimeout(function () {
    document.querySelectorAll("#zero1, #zero2, #zero3").forEach((el) => {
    el.style.display = "flex";
});

    wrapTextInSpans("#zero1", 1);
    wrapTextInSpans("#zero2", 2);
    wrapTextInSpans("#zero3", 3);

    initAnimation();
}, 800);
});

    function initAnimation() {
    // Flicker effect for the zero elements
    let split1 = new SplitText("#zeroText1", {type: "chars"});
    let split2 = new SplitText("#zeroText2", {type: "chars"});
    let split3 = new SplitText("#zeroText3", {type: "chars"});
    let flickerEase =
    "rough({ template: circ.easeOut, strength: 4, points: 50, taper: 'out', randomize: true, clamp: true })";

    // Check if the current path is exactly the root
    if (
    window.location.pathname === "/" &&
    window.location.search === "" &&
    window.location.hash === "" &&
    !isSafari &&
    Webflow.env("editor") === undefined
    ) {
    lenis.stop();
}

    if (isSafari) {
    document.body.style.overflow = "none";
}

    gsap.from([...split1.chars, ...split2.chars, ...split3.chars], {
    autoAlpha: 0,
    duration: 1,
    stagger: {each: 0.05, from: "random"},
    ease: flickerEase,
    onComplete: function () {
    countWithLeadingZeros(0, "#zeroText2", "#zeroText1");
},
});
}

    // Function to count with leading zeros
    function countWithLeadingZeros(count, currentElementId, mainElementId) {
    const maxCount = 9;
    let mainCount = 0;
    const currentElement = document.querySelector(currentElementId);
    const mainElement = document.querySelector(mainElementId);

    if (!currentElement || !mainElement) {
    return;
}

    const interval = setInterval(() => {
    count++;

    currentElement.innerText = count.toString().padStart(1, "0");

    // When count reaches max, reset and increment the mainCount
    if (count >= maxCount) {
    clearInterval(interval);
    count = 0; // Reset the current count
    currentElement.innerText = count;

    mainCount++;
    mainElement.innerText = mainCount.toString().padStart(1, "0");

    if (mainCount >= 1) {
    setTimeout(() => {
    pixelate(interval);
}, 400); // Delay pixelation by 400 milliseconds
}
}
}, 200);

    setTimeout(() => {
    gsap.to(`#zeroText1, #zeroText2, #zeroText3`, {
    opacity: 0, // Animate the spans' opacity directly
    duration: 0.5,
    onComplete: () => {
    // Optional: Hide the parent elements after the animation
    document.querySelectorAll("#zero1, #zero2, #zero3").forEach((el) => {
    el.style.display = "none"; // You can keep this if you want to remove them from the view
});
},
});
}, (maxCount + 1) * 200);
}

    function pixelate(interval) {
    const preloader = document.querySelector("#preloader");
    const columns = preloader.querySelectorAll(".col");
    let allTargetDivs = [];

    if (!columns) {
    return;
}

    columns.forEach((column) => {
    const allDivs = column.querySelectorAll(".pixel");

    // Get only the divs in the 4th, 5th, and 6th rows (after index 9)
    const targetDivs = Array.from(allDivs).filter((_div, i) => i >= 9);

    allTargetDivs = allTargetDivs.concat(targetDivs);
});

    const duration = 0.5;
    const tl = gsap.timeline();
    gsap.delayedCall(0.4, animateHeroHeader);
    if (allTargetDivs.length > 0) {
    tl.to(allTargetDivs, {
    backgroundColor: "transparent",
    opacity: 0,
    duration: duration,
    stagger: {amount: 1, from: "random"},
    onComplete: () => {
    !isSafari && Webflow.env("editor") === undefined && lenis.start();
    if (isSafari) {
    document.body.style.overflow = "auto";
}
    if (preloader) {
    preloader.style.display = "none";
}
    clearInterval(interval);
},
});
}
}

    function animateHeroHeader() {
    return;
    const items = document.querySelectorAll("[anim-hero-trigger]");
    if (!items) {
    return;
}

    items.forEach((item) => {
    let itemTl = gsap.timeline({
    paused: true,
});
    let split = new SplitText(item, {type: "words, chars"});

    itemTl.from(
    split.chars,
{
    autoAlpha: 0,
    duration: 0.75,
    stagger: {each: 0.05, from: "random"},
    ease: FLICKER_EASE,
},
    0 // Start at time 0
    );

    // Scramble text animation on individual characters running at the same time
    itemTl.to(
    split.chars, // Apply scramble to individual characters
{
    scrambleText: {
    chars: SCRAMBLE_CHAR_SET, // Scramble characters
    text: "{original}", // Original text it scrambles back to
    speed: 2, // Scramble speed
    delimiter: "", // Delimiter between scrambled characters
},
    duration: 1.5,
},
    0
    ); // This 0 means start the scramble animation at the same time as flicker

    marqueeAnimation();
    itemTl.play();
});
}

    function marqueeAnimation() {
    const boxes = document.querySelectorAll(".marquee-heading");

    loop = horizontalLoop(boxes, {
    repeat: -1,
    speed: 0.5,
    paddingRight: 16,
});
}
    /*
    This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

    Features:
    - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most
    cases.
    - When each item animates to the left or right enough, it will loop back to the other side
    - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per
    second), paused (boolean), repeat, and paddingRight.
    - The returned timeline will have the following methods added to it:
    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object
    to control duration, easing, etc.
    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars
    object to control duration, easing, etc.
    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a
    vars object to control duration, easing, etc. Always goes in the shortest direction
    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
    - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label
    added accordingly, so "label1" is when the 2nd element reaches the start.
    */
    function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: {ease: "none"},
}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
    config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
    gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
    let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
    xPercents[i] = snap(
    (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
    gsap.getProperty(el, "xPercent")
    );
    return xPercents[i];
},
});
    gsap.set(items, {x: 0});
    totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
    distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
    item,
{
    xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
    duration: distanceToLoop / pixelsPerSecond,
},
    0
    )
    .fromTo(
    item,
{
    xPercent: snap(
    ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
    ),
},
{
    xPercent: xPercents[i],
    duration:
    (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
    immediateRender: false,
},
    distanceToLoop / pixelsPerSecond
    )
    .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
}
    function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
    (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
    time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
    // if we're wrapping the timeline's playhead, make the proper adjustments
    vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
    time += tl.duration() * (index > curIndex ? 1 : -1);
}
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
}
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    return tl;
}
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
    const productMenu = document.querySelector(".product-menu");

    // Function to calculate height and check for layout and animations
    function calculateHeightAndCheck() {
    const productMenuList = document.querySelector(".product-menu-list");
    const divBlock23 = document.querySelector(".div-block-23");
    const easterEgg = document.querySelector(".product-easter-egg");
    const productMenuItems = document.querySelectorAll(".product-menu-item");

    if (!productMenuList || !divBlock23) {
    return;
}

    // Temporarily show the menu items if they are hidden
    let itemsWereHidden = false;
    if (
    productMenuItems[0] &&
    getComputedStyle(productMenuItems[0]).display === "none"
    ) {
    itemsWereHidden = true;
    productMenuItems.forEach((item) => {
    item.style.visibility = "hidden";
    item.style.display = "block";
});
}

    // Now that the items are visible, get their height
    const itemHeight = productMenuItems[0]?.offsetHeight || 0; // Get one item height

    // Clean up temporary styles if items were hidden
    if (itemsWereHidden) {
    productMenuItems.forEach((item) => {
    item.style.visibility = "";
    item.style.display = "";
});
}

    const gapValue = parseInt(
    getComputedStyle(productMenuList).getPropertyValue("row-gap") || 0
    ); // Gap between items
    const dropdownPaddingTop = parseInt(
    getComputedStyle(productMenuList).getPropertyValue("padding-top") || 0
    );
    const dropdownPaddingBottom = parseInt(
    getComputedStyle(productMenuList).getPropertyValue("padding-bottom") ||
    0
    );
    const viewportHeight = window.innerHeight;
    const paddingBuffer = 50; // Additional padding value to ensure margin

    const totalItems = productMenuItems.length;
    const totalHeight =
    totalItems * itemHeight +
    (totalItems - 1) * gapValue +
    dropdownPaddingTop +
    dropdownPaddingBottom;

    // Determine if it should be a 2-column layout
    const isTwoColumn = totalHeight > viewportHeight - paddingBuffer;

    // Apply classes based on the calculation
    if (isTwoColumn) {
    productMenuList.classList.add("overflow-product-menu-list");
    divBlock23.classList.add("overflow-div-block-23");

    // Show the easter egg only if the number of items is odd
    if (easterEgg && (totalItems - 1) % 2 !== 0) {
    easterEgg.style.display = "block";
} else if (easterEgg) {
    easterEgg.style.display = "none";
}
} else {
    productMenuList.classList.remove("overflow-product-menu-list");
    divBlock23.classList.remove("overflow-div-block-23");

    // Hide the easter egg
    if (easterEgg) {
    easterEgg.style.display = "none";
}
}

    // Check if the dropdown is open
    if (productMenuList.classList.contains("w--open") && productMenu) {
    // Add .animate or .animate-2-column based on layout
    if (isTwoColumn) {
    productMenu.classList.add("animate-2-column");
    productMenu.classList.remove("animate");
} else {
    productMenu.classList.add("animate");
    productMenu.classList.remove("animate-2-column");
}
} else {
    // Remove animation classes when dropdown is closed
    removeAnimationClasses();
}
}

    function handleDropdownToggle() {
    const dropdownToggle = document.querySelector(".product-menu-toggle");
    if (!dropdownToggle) return;

    dropdownToggle.addEventListener("click", function () {
    // Use setTimeout to ensure the dropdown state is updated
    setTimeout(() => {
    calculateHeightAndCheck();
}, 15);
});
}

    // Add a debounced version of height calculation for resize event
    window.addEventListener("resize", debounce(calculateHeightAndCheck, 50));

    // Event listener for Escape key
    document.addEventListener(
    "keydown",
    function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
    removeAnimationClasses();
}
},
    true
    );

    // Event listener for clicking outside the product menu
    document.addEventListener(
    "click",
    function (event) {
    const productMenuList = document.querySelector(".product-menu-list");
    if (!productMenuList.contains(event.target)) {
    removeAnimationClasses();
}
},
    true
    );

    function removeAnimationClasses() {
    productMenu.classList.remove("animate");
    productMenu.classList.remove("animate-2-column");
}

    // Perform the calculation on page load
    calculateHeightAndCheck();

    // Initialize the dropdown toggle event listener
    handleDropdownToggle();
});
</script>

<script>
    function hideBanner() {
    const banner = document.getElementById("cookie-consent-banner");
    if (!banner) return;

    banner.style.opacity = "0";
    setTimeout(function () {
    banner.style.display = "none";
    banner.style.pointerEvents = "none";
}, 500);
}

    document
    .getElementById("btn-hide-banner")
    ?.addEventListener("click", function () {
    hideBanner();
});

    if (localStorage.getItem("consentMode") === null) {
    document
        .getElementById("btn-accept-all")
        .addEventListener("click", function () {
            setConsent({
                necessary: true,
                analytics: true,
                preferences: true,
                marketing: true,
                userdata: true,
                personalization: true,
            });
            hideBanner();
        });
    document
    .getElementById("btn-reject-all")
    .addEventListener("click", function () {
    setConsent({
    necessary: false,
    analytics: false,
    preferences: false,
    marketing: false,
    userdata: false,
    personalization: false,
});
    hideBanner();
});

    const banner = document.getElementById("cookie-consent-banner");
    banner.style.display = "flex";
    // Use a timeout to ensure the display change takes effect before adding the show class
    setTimeout(function () {
    banner.classList.add("show");
}, 10); // Short delay to ensure the display change is rendered before fading in
}

    function setConsent(consent) {
    const consentMode = {
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.userdata ? "granted" : "denied",
    ad_personalization: consent.personalization ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
    personalization_storage: consent.preferences ? "granted" : "denied",
    functionality_storage: consent.necessary ? "granted" : "denied",
    security_storage: consent.necessary ? "granted" : "denied",
};
    gtag("consent", "update", consentMode);
    localStorage.setItem("consentMode", JSON.stringify(consentMode));
}
</script>

<script>
    document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 767) {
    document.querySelectorAll("[scramble-link]").forEach((e) => {
    let t = gsap.timeline({paused: !0});
    t.to(e.querySelector("[scramble-text]"), {
    scrambleText: {
    chars: "021zrotxinsmopsweknm",
    text: "{original}",
    speed: 2,
    delimiter: "",
},
    duration: 0.8,
});

    e.addEventListener("mouseenter", () => {
    t.timeScale(1).play();
});

    e.addEventListener("mouseleave", () => {
    t.timeScale(1.5).reverse();
});
});
}
});
</script>

<script>
    // Utility function to get target divs based on index range
    function getTargetDivs(elements, from = 0, to = Infinity) {
    if (!elements) return [];

    let allTargetDivs = [];

    elements.forEach((element) => {
    const pixels = element.querySelectorAll(".page-transition-pixel");
    const targetDivs = Array.from(pixels).slice(from, to + 1);
    allTargetDivs.push(...targetDivs);
});

    return allTargetDivs;
}

    function getRandomSubset(array, inclusionProbability = 0.75) {
    return array.filter(() => Math.random() < inclusionProbability);
}

    // Function to pixelate elements (fade out)
    function pixelateElements({elements, onComplete, from = 0, to = Infinity}) {
    const allTargetDivs = getRandomSubset(getTargetDivs(elements, from, to));

    if (allTargetDivs.length > 0) {
    gsap.to(allTargetDivs, {
    backgroundColor: "transparent",
    borderColor: "transparent",
    duration: 0.5,
    stagger: {
    amount: 1,
    from: "random",
},
    onComplete,
});
}
}

    // Function to reverse pixelation (fade in)
    function pixelateElementsReverse({
    elements,
    onComplete,
    from = 0,
    to = Infinity,
}) {
    const allTargetDivs = getRandomSubset(getTargetDivs(elements, from, to));

    if (allTargetDivs.length > 0) {
    gsap.fromTo(
    allTargetDivs,
{backgroundColor: "transparent", borderColor: "transparent"},
{
    backgroundColor: "#ff7120",
    borderColor: "#ff7120",
    duration: 0.5,
    stagger: {
    amount: 1,
    from: "random",
},
    onComplete,
}
    );
}
}

    document.addEventListener("DOMContentLoaded", () => {
    const TRANSITION_CONTAINER_SELECTOR = ".page-transition-container";
    const COL_SELECTOR = `${TRANSITION_CONTAINER_SELECTOR} .page-transition-col`;
    const NO_TRANSITION_SELECTOR = ".no-transition";
    const gsapConfig = {
    ease: "power3.inOut",
    duration: 1.1,
    stagger: {
    from: "random",
    amount: 0.2,
},
};

    let isTransitioning = false;
    const preloadAnimationShown =
    sessionStorage.getItem("preloadAnimationShown") === "true";

    if (preloadAnimationShown) {
    runPageLoadTransition();
}

    // Attach click event to links
    document
    .querySelectorAll(`a:not(${NO_TRANSITION_SELECTOR})`)
    .forEach((link) => {
    link.addEventListener("click", (e) => {
    const currentUrl = link.getAttribute("href");

    // Check if the link meets the criteria for the transition
    if (
    link.hostname === window.location.hostname &&
    !currentUrl.includes("#") &&
    link.getAttribute("target") !== "_blank" &&
    currentUrl !== window.location.pathname &&
    !isTransitioning
    ) {
    e.preventDefault();
    isTransitioning = true; // Prevent multiple transitions

    if (preloadAnimationShown) {
    runPageTransition(currentUrl);
} else {
    window.location.href = currentUrl;
}
}
});
});

    // Reload the page when navigating back to ensure animations run correctly
    window.onpageshow = (event) => {
    if (event.persisted) {
    window.location.reload();
}
};

    // Function to handle the page load transition animation
    function runPageLoadTransition() {
    const elements = document.querySelectorAll(COL_SELECTOR);

    pixelateElements({
    elements,
    onComplete: function () {
    this.time(0).kill();
},
    from: 13,
});

    const tl = gsap.timeline();
    gsap.delayedCall(0.92, animateHeroHeader);

    tl.to(
    `${COL_SELECTOR} .border`,
{
    yPercent: -100,
    duration: 0.9,
    ease: "power3.inOut",
    stagger: gsapConfig.stagger,
},
    0
    )
    .to(
    COL_SELECTOR,
{
    scaleY: 0,
    transformOrigin: "top",
    ...gsapConfig,
},
    "-=0.8"
    )
    .set(TRANSITION_CONTAINER_SELECTOR, {display: "none"});
}

    // Function to handle the page transition animation when a link is clicked
    function runPageTransition(currentUrl) {
    const elements = document.querySelectorAll(COL_SELECTOR);

    pixelateElementsReverse({
    elements,
    from: 0,
    to: 4,
});

    const tl = gsap.timeline({
    onComplete: () => {
    window.location.href = currentUrl;
    isTransitioning = false;
},
});

    tl.set(TRANSITION_CONTAINER_SELECTOR, {display: "block"})
    .fromTo(
    COL_SELECTOR,
{scaleY: 0, transformOrigin: "bottom"},
{
    scaleY: 1,
    ...gsapConfig,
}
    )
    .fromTo(
    `${COL_SELECTOR} .border`,
{yPercent: 100},
{
    yPercent: 0,
    duration: 0.9,
    ease: "power3.inOut",
    stagger: gsapConfig.stagger,
},
    "-=0.8"
    );
}
});
</script>
