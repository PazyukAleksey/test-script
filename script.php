<script type="importmap">
    {
      "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@v0.151.3/build/three.module.min.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.151.3/examples/jsm/"
      }
    }
</script>
<!--<script src='https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/Update+02.08.24/main-home.min.js' type='module' async></script>-->
<!--<script src='https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/video/main-home-v-1.min.js' type='module' async></script>-->

<script src='https://cdn.jsdelivr.net/gh/PazyukAleksey/test-script@main/main-script-no-reviews.js' type='module' async></script>

<!--<script src='https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/js/main-script-no-reviews.js' type='module' async></script>-->

<script type="text/javascript">(function(d, t){
    if(window.location.hash!='#Airdrop'&&(''+document.cookie).match(/(^|;)\s*GleamUc1Ts=X($|;)/)){return;}

    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://widget.gleamjs.io/sF3C8/ol.js"; s.parentNode.insertBefore(g, s);
  }(document, "script"));</script>

<style>
    .caselist-slider-item {
        position: relative;
    }
    .caselist-slider-item:before {
        top: -1px;
        left: -9px;
        transform: rotate(-45deg);
        transform-origin: top right;
        position: absolute;
        width: 32px;
        height: 1px;
        background: #353539;
        content: "";
    }
    .caselist-slider-item:after {
        top: -1px;
        left: 1px;
        position: absolute;
        width: 20px;
        height: 1px;
        background: #0a090f;
        content: "";
    }
    #pricing-api .card-heading-badge {
        font-size: 1.125rem;
        line-height: 1.575rem;
    }
    #pricing-api .card-heading-badge strong {
        font-weight: 400;
        opacity: .6;
        font-size: 0.875rem;
    }
    .pricing-clip-col.hidden .pricing-card-text {
        margin-bottom: 0;
    }
    .pricing-clip-col.active .price-slide-icon {
        transform: rotate(45deg);
    }
    .pricing-clip-col.active .price-slide-icon {
        transform: rotate(45deg);
    }
    .review-sub-text {
        opacity: 0.6 !important;
    }

    .section-title-bordered-line-1.stbl-pricing:after {
        left: 0;
        width: 72%;
    }
    .pricing-title-border {
        position: relative;
        padding-left: 1rem;
        padding-right: 1.1rem;
    }
    .pricing-title-border:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/670cfebba604aa3309fbe390_pricing-border.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    @media (max-width: 768px) {
        .pricing-title-border:before {
            top: -1px;
            bottom: -1px;
        }
    }
</style>
<script>
  $(document).ready(function() {
    $('.case-item-image-wrapper').each(function() {
      let color = $(this).find('.case-bg-color').text();
      $(this).find('.case-item-bg-gradient').css('background', 'linear-gradient(134.28deg, '+color+' 10.03%, rgba(9, 9, 14, 0) 42.81%)');
    });

    let switcherHandler = function() {
      let switcher = $('#pricing-switcher-wrapper');
      if(switcher.hasClass('active')) {
        $('#pricing-api').fadeOut('fast', () => $('#pricing-sdk').fadeIn())
      } else {
        $('#pricing-sdk').fadeOut('fast', () => $('#pricing-api').fadeIn())
      }
      switcher.toggleClass('active');
      $('#pricing-switcher-wrapper-point').toggleClass('active');
    }
    $(document).on('click', '#pricing-switcher-wrapper', switcherHandler);
    $(document).on('click', '.price-slide-icon', function(e){
      let parent = $(e.target).closest('.pricing-clip-col');
      if(parent.hasClass('active')) {
        parent.removeClass('active');
        parent.find('.features-list').slideUp();
        parent.find('.pricing-clip-action').slideUp();
      } else {
        parent.addClass('active');
        parent.find('.features-list').slideDown();
        parent.find('.pricing-clip-action').slideDown();
      }
    });
  });
</script>