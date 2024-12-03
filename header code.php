<script src='https://unpkg.com/gsap@3.11.5/dist/ScrollTrigger.min.js'></script>
<script src='https://unpkg.com/gsap@3.11.5/dist/gsap.min.js'></script>
<script src='https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/Update+02.08.24/ScrambleTextPlugin.min.js'></script>
<!-- [Attributes by Finsweet] CMS Slider -->
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsslider@1/cmsslider.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script>
<script src='https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/Update+02.08.24/main-global.min.js'></script>

<script>
  var cookie3Options = {"siteId":214,"additionalTracking":true,"cookielessEnabled":true}

  window._paq = window._paq || [];
  (function () {
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = 'https://cdn.cookie3.co/scripts/analytics/latest/cookie3.analytics.min.js'; s.parentNode.insertBefore(g, s);
  })();
</script>
<script>
  function hideBanner() {
    document.getElementById('cookie-consent-banner').style.display = 'none';
  }
  document.getElementById('btn-hide-banner').addEventListener('click', function() {
    hideBanner();
  });
  document.getElementById('btn-hide-banner-mob').addEventListener('click', function() {
    hideBanner();
  });
  if(localStorage.getItem('consentMode') === null) {
    document.getElementById('btn-accept-all').addEventListener('click', function() {
      setConsent({
        necessary: true,
        analytics: true,
        preferences: true,
        marketing: true,
        userdata: true,
        personalization: true
      });
      hideBanner();
    });
    document.getElementById('btn-reject-all').addEventListener('click', function() {
      setConsent({
        necessary: false,
        analytics: false,
        preferences: false,
        marketing: false,
        userdata: false,
        personalization: false
      });
      hideBanner();
    });
    document.getElementById('cookie-consent-banner').style.display = 'flex';
  }
  function setConsent(consent) {
    const consentMode = {
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.userdata ? 'granted' : 'denied',
      'ad_personalization': consent.personalization ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'personalization_storage': consent.preferences ? 'granted' : 'denied',
      'functionality_storage': consent.necessary ? 'granted' : 'denied',
      'security_storage': consent.necessary ? 'granted' : 'denied',
    };
    gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
  }

  function CheckSiteVersion() {
    const productionDomain = "www.chaingpt.org";
    const stageDomain = "chain-gpt.webflow.io";

    const currentDomain = window.location.hostname;

    if (currentDomain === stageDomain) {
      document.body.classList.add("stage-site");
    }
    if (currentDomain === productionDomain) {
      document.body.classList.add("prod-site");
    }

    const path = window.location.pathname;

    if (path.startsWith('/ko') || path.startsWith('/ko/')) {
      document.body.classList.add("korean-language");
    }

    document.body.classList.add("page-ready");
  }
  CheckSiteVersion();

</script>
<style>
    .article-content strong {
        font-weight: 700;
    }
    .stage-site .hide-on-stage {
        display: none !important;
    }
    .prod-site .hide-on-prod {
        display: none !important;
    }

    @media(max-width: 767px) {
        .desktop-show {
            display: none !important;
        }
        .mobile-show {
            display: block !important;
        }
    }
</style>