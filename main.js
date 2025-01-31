/*
const accordionItems = document.querySelectorAll('.wrapper-accordion');

accordionItems.forEach(item => {
    const plusIcon = item.querySelector('.plus');
    const minusIcon = item.querySelector('.minus');
    const content = item.querySelector('.the-content');
    const title = item.querySelector('.title');
    const parentLink = item.querySelector('.parent-link');

    // Function to toggle the accordion
    function toggleAccordion() {
        if (content.style.display === 'block') {
            content.style.display = 'none'; 
            parentLink.style.display = 'none';  
            plusIcon.style.display = 'inline-block';  
            minusIcon.style.display = 'none';  
            title.style.color = '';  
        } else {
            content.style.display = 'block';  
            parentLink.style.display = 'block';  
            plusIcon.style.display = 'none';  
            minusIcon.style.display = 'inline-block';  
            title.style.color = '#4BA5CB';  
        }
    }

 
    title.addEventListener('click', toggleAccordion);
    

    plusIcon.addEventListener('click', toggleAccordion);


    minusIcon.addEventListener('click', toggleAccordion);
});
*/
const accordionItems = document.querySelectorAll('.wrapper-accordion');

accordionItems.forEach((item, index) => {
    const plusIcon = item.querySelector('.plus');
    const minusIcon = item.querySelector('.minus');
    const content = item.querySelector('.the-content');
    const title = item.querySelector('.title');
    const parentLink = item.querySelector('.parent-link');

  
    function toggleAccordion() {
       
        accordionItems.forEach(otherItem => {
            const otherContent = otherItem.querySelector('.the-content');
            const otherParentLink = otherItem.querySelector('.parent-link');
            const otherPlusIcon = otherItem.querySelector('.plus');
            const otherMinusIcon = otherItem.querySelector('.minus');
            const otherTitle = otherItem.querySelector('.title');
            
            // Close the content of other accordion items
            if (otherItem !== item) {
                otherContent.style.display = 'none';
                otherParentLink.style.display = 'none';
                otherPlusIcon.style.display = 'inline-block';
                otherMinusIcon.style.display = 'none';
                otherTitle.style.color = '';
            }
        });

        if (content.style.display === 'block') {
            content.style.display = 'none';  
            parentLink.style.display = 'none'; 
            plusIcon.style.display = 'inline-block';  
            minusIcon.style.display = 'none'; 
            title.style.color = ''; 
        } else {
            content.style.display = 'block';  
            parentLink.style.display = 'block';  
            plusIcon.style.display = 'none';  
            minusIcon.style.display = 'inline-block';  
            title.style.color = '#4BA5CB';  
        }
    }

  
    title.addEventListener('click', toggleAccordion);
    
    
    plusIcon.addEventListener('click', toggleAccordion);

   
    minusIcon.addEventListener('click', toggleAccordion);

  
    if (index === 0) {
        content.style.display = 'block';  
        parentLink.style.display = 'block';  
        plusIcon.style.display = 'none';  
        minusIcon.style.display = 'inline-block'; 
        title.style.color = '#4BA5CB'; 
    }
});

$(document).ready(function() {
  var sliderImg = $('.slider-img');
  var currentIndex = 0;

  var certNames = ["Сертификат ГосНИИГА", "Авторизационное письмо"  ];
  var certContents = [
    "В соответствии с возросшими требованиями к организациям-поставщикам АТИ, обеспечивающим деятельность авиакомпаний по поддержанию летной годности эксплуатируемого парка ВС, ООО «ВЕРТО» прошла добровольную процедуру оценки своей деятельности на соответствие «Требованиям к организациям, осуществляющим поставку авиационно-технического имущества» предъявляемым к организациям-поставщикам АТИ в Системе добровольной сертификации объектов гражданской авиации. В 2016 году впервые был получен Сертификат соответствия, выданный в Государственном Научно-Исследовательском Институте Гражданской Авиации и продлевается регулярно.",
    "ООО «ВЕРТО» — официальный представитель  АО НПЦ «Авиатехнологии», компании, специализирующейся на производстве деталей сборочных единиц (ДСЕ) для авиационных и морских двигателей, разработке нестандартизированного технологического оборудования и оснастки, а также ремонте и продлении ресурса авиационной техники и агрегатов."
  ];

  // Function to update the content based on the current index
  function updateCertContent() {
    $('#cert-name').text(certNames[currentIndex]);   // Update the certificate name
    $('#cert-content').text(certContents[currentIndex]); // Update the certificate content

    // Update active state on navigation buttons
    $('.nav-btn').removeClass('active');
    $('.nav-btn').eq(currentIndex).addClass('active');
  }

  // Initial content update
  updateCertContent();

  // Function to get the image width (to calculate scroll amount)
  function getImageWidth() {
    var imageWidth = $('.slider-img img').first().width();
    return imageWidth;
  }

  // Function to scroll the slider and update content
  function scrollSlider(direction) {
    var imageWidth = getImageWidth();
    var currentScroll = sliderImg.scrollLeft();

    if (direction === 'next') {
      // Only move to the next image if it's not the last image
      if (currentIndex < certNames.length - 1) {
        currentIndex = currentIndex + 1;
        sliderImg.animate({
          scrollLeft: currentScroll + imageWidth
        }, 300);
      }
    } else if (direction === 'prev') {
      // Only move to the previous image if it's not the first image
      if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
        sliderImg.animate({
          scrollLeft: currentScroll - imageWidth
        }, 300);
      }
    }

    // Update the content after scrolling
    updateCertContent();
  }

  // Event listeners for the "next" and "prev" buttons
  $('.next').on('click', function() {
    scrollSlider('next');
  });

  $('.prev').on('click', function() {
    scrollSlider('prev');
  });

  // Event listener for the nav buttons
  $('.nav-btn').on('click', function() {
    currentIndex = $(this).data('index');
    var imageWidth = getImageWidth();
    var newScrollPosition = currentIndex * imageWidth;

    sliderImg.animate({
      scrollLeft: newScrollPosition
    }, 300);

    // Update the content and active state
    updateCertContent();
  });

  // Dynamically create the navigation buttons based on the number of slides
  function createNavButtons() {
    var navContainer = $('.slider-nav');
    navContainer.empty(); // Clear any existing buttons

    certNames.forEach(function(_, index) {
      var button = $('<button class="nav-btn" data-index="' + index + '"></button>');
      navContainer.append(button);
    });

    // Initialize the first button as active
    updateCertContent();
  }

  // Call the function to create nav buttons
  createNavButtons();

  // Handle resizing of the window to adjust image width and maintain scroll position
  $(window).resize(function() {
    var imageWidth = getImageWidth();
    var newScrollPosition = currentIndex * imageWidth;

    // Adjust the scroll position to match the current index after resizing
    sliderImg.scrollLeft(newScrollPosition);
  });
});

window.addEventListener('scroll', function() {
  const first = document.querySelector('.first');
  const second = document.querySelector('.second');
  
  const scrollY = window.scrollY;

  if (scrollY > 100) { // You can adjust the scroll position threshold as needed
    first.style.display = 'none';
    second.style.display = 'block'; // Show second by changing display to 'block'
  } else {
    first.style.display = 'block';
    second.style.display = 'none'; // Hide second when scrolling back up
  }
});


 $('.up').on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500); // Scroll to top in 500ms
  });

document.querySelector('.parent-d').addEventListener('click', function() {
    const fullScreenElement = document.querySelector('.full-screen');
    const html = document.documentElement; // Select the <html> element

    // Toggle the display of the full-screen element
    if (fullScreenElement.style.display === 'none' || fullScreenElement.style.display === '') {
        fullScreenElement.style.display = 'flex'; // Show the full-screen element
        html.style.overflow = 'hidden'; // Prevent scrolling on html
    } else {
        fullScreenElement.style.display = 'none'; // Hide the full-screen element
        html.style.overflow = ''; // Reset overflow to default (allow scrolling)
    }
});


document.querySelector('.clse').addEventListener('click', function() {
    const fullScreenElement = document.querySelector('.full-screen');
    const html = document.documentElement; // Select the <html> element

    // Hide the full-screen element
    fullScreenElement.style.display = 'none';

    // Restore scrolling on the <html> element
    html.style.overflow = 'scroll'; // Allow scrolling on html
});

// Show .thx when #send is clicked
document.getElementById('send').addEventListener('click', function() {
    document.querySelector('.thx').style.display = 'block';
});

// Hide .thx when .w-close is clicked
document.querySelector('.w-close').addEventListener('click', function() {
    document.querySelector('.thx').style.display = 'none';
});
