$(document).ready(function(){
	initPopovers();
	modalBottomSheets();
	emailFieldValidation();
	passwordFieldValidation();
	saisie();
	init();
 });


	function emailFieldValidation()
	{
		e.preventDefault();
		var mailInput = $("#email");

	   	mailInput.keyup(function()
		{
			var value = $(this).val();
			var regexMail = /^[0-9a-z._-]+@{1}[0-9a-z._-]{2,}[.]{1}[a-z]{2,}$/gs;

			$(this).removeClass("error good");

			if(value == "")
				return;
			if ((!isNaN(value) && (value.length <= 10)) || regexMail.test(value))
				$(this).addClass("good");
			else
				$(this).addClass("error");
	   	});

		   return false;
	}

	function passwordFieldValidation()
	{
		e.preventDefault();
		var passwdInput = $("#password");
		var passwdVerifmInput = $("#verifPassword");

		passwdInput.keyup(function()
		{
			var value = $(this).val();
			var regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])([a-zA-Z0-9]{8,})/;

			$(this).removeClass("error good");

			if(value == "")
				return;
			if ((regexPassword.test(value) == true))
				$(this).addClass("good");
			else
				$(this).addClass("error");
	   	});

		passwdVerifmInput.keyup(function()
		{
			var value = $(this).val();
			$(this).removeClass("error good");

			if(value == "")
					return;
			if( $("#password").val() == $("#verifPassword").val())
				$(this).addClass("good");
			else
				$(this).addClass("error");
		});

		return false;
	}

	function initPopovers()
	{
	   $(".lost-identification-id-lost").mouseenter(function(){
		  $(".popover-content-id-lost").addClass('mouse-center');
	   }).mouseleave(function(){
		  $(".popover-content-id-lost").removeClass('mouse-center');
	   });
	}

	function modalBottomSheets()
	{
	   // Initialisation des deux variables
	   var modal = $("#modalIdLost");
	   var btn = $("#btnIdLost");
	   // Ouverture de la modal
	   btn.click(function (e) {
		  e.preventDefault();
		  modal.addClass("active");
	   });
	   // Fermeture de la modal en appuyant sur un endroit de la page
	   modal.click(function () {
		  modal.toggleClass("active");
	   });
	   // Fermeture de la modal avec un scroll
	   $(window).scroll(function(){
		  if ($(window).scrollTop() > 1)
		  {
			 modal.removeClass("active");
		  }
	   });
	}

	function saisie()
	{
		var formNumberMax = $("#formNumberMax");

		formNumberMax.keyup(function()
		{
			var max = 10;
			var numberMaxLength = formNumberMax.val().length;
			var value = $(this).val();

			if(numberMaxLength > max){
				alert("Vous avez dépassé "+ max +" caractères!");
				value = value.substring(0,max);
			}
			fo.restant.value = max-document.fo.sms.value.length;
		});
	};

	function init()
	{
		fo.sms.value = "";
		fo.sms.focus();
		saisie();
	};

	$(document).ready(function(){

		var current_fs, next_fs, previous_fs; //fieldsets
		var opacity;
		var current = 1;
		var steps = $("fieldset").length;
		
		setProgressBar(current);
		
		$(".next").click(function(){
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//Add Class Active
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
		step: function(now) {
		// for making fielset appear animation
		opacity = 1 - now;
		
		current_fs.css({
		'display': 'none',
		'position': 'relative'
		});
		next_fs.css({'opacity': opacity});
		},
		duration: 500
		});
		setProgressBar(++current);
		});
		
		$(".previous").click(function(){
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//Remove class active
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show();
		
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
		step: function(now) {
		// for making fielset appear animation
		opacity = 1 - now;
		
		current_fs.css({
		'display': 'none',
		'position': 'relative'
		});
		previous_fs.css({'opacity': opacity});
		},
		duration: 500
		});
		setProgressBar(--current);
		});
		
		function setProgressBar(curStep){
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar")
		.css("width",percent+"%")
		}
		
		$(".submit").click(function(){
		return false;
		})
		
	});





		/* *************************VERIFICATION DES CHAMPS ********************************* */
		var currentTab = 0; // Current tab is set to be the first tab (0)
		showTab(currentTab); // Display the current tab
		function showTab(n) {
		  // This function will display the specified tab of the form ...
		  var x = document.getElementsByClassName("tab");
		  x[n].style.display = "block";
		  // ... and fix the Previous/Next buttons:
		  if (n == 0) {
			document.getElementById("prevBtn").style.display = "none";
		  } else {
			document.getElementById("prevBtn").style.display = "inline";
		  }
		  if (n == (x.length - 1)) {
			document.getElementById("nextBtn").innerHTML = "Submit";
		  } else {
			document.getElementById("nextBtn").innerHTML = "Next";
		  }
		  // ... and run a function that displays the correct step indicator:
		  fixStepIndicator(n)
		}

		function nextPrev(n) {
		  // This function will figure out which tab to display
		  var x = document.getElementsByClassName("tab");
		  // Exit the function if any field in the current tab is invalid:
		  if (n == 1 && !validateForm()) return false;
		  // Hide the current tab:
		  x[currentTab].style.display = "none";
		  // Increase or decrease the current tab by 1:
		  currentTab = currentTab + n;
		  // if you have reached the end of the form... :
		  if (currentTab >= x.length) {
			//...the form gets submitted:
			document.getElementById("regForm").submit();
			return false;
		  }
		  // Otherwise, display the correct tab:
		  showTab(currentTab);
		}

		function validateForm() {
		  // This function deals with validation of the form fields
		  var x, y, i, valid = true;
		  x = document.getElementsByClassName("tab");
		  y = x[currentTab].getElementsByTagName("input");
		  // A loop that checks every input field in the current tab:
		  for (i = 0; i < y.length; i++) {
			// If a field is empty...
			if (y[i].value == "") {
			  // add an "invalid" class to the field:
			  y[i].className += " invalid";
			  // and set the current valid status to false:
			  valid = false;
			}
		  }
		  // If the valid status is true, mark the step as finished and valid:
		  if (valid) {
			document.getElementsByClassName("step")[currentTab].className += " finish";
		  }
		  return valid; // return the valid status
		}

		function fixStepIndicator(n) {
		  // This function removes the "active" class of all steps...
		  var i, x = document.getElementsByClassName("step");
		  for (i = 0; i < x.length; i++) {
			x[i].className = x[i].className.replace(" active", "");
		  }
		  //... and adds the "active" class to the current step:
		  x[n].className += " active";
		}

























// 	/* Fundraising Grader
// *
// * Generic Copyright, yadda yadd yadda
// *
// * Plug-ins: jQuery Validate, jQuery
// * Easing
// */

// $(document).ready(function() {
//     var current_fs, next_fs, previous_fs;
//     var left, opacity, scale;
//     var animating;
//     $(".steps").validate({
//         errorClass: 'invalid',
//         errorElement: 'span',
//         errorPlacement: function(error, element) {
//             error.insertAfter(element.next('span').children());
//         },
//         highlight: function(element) {
//             $(element).next('span').show();
//         },
//         unhighlight: function(element) {
//             $(element).next('span').hide();
//         }
//     });
//     $(".next").click(function() {
//         $(".steps").validate({
//             errorClass: 'invalid',
//             errorElement: 'span',
//             errorPlacement: function(error, element) {
//                 error.insertAfter(element.next('span').children());
//             },
//             highlight: function(element) {
//                 $(element).next('span').show();
//             },
//             unhighlight: function(element) {
//                 $(element).next('span').hide();
//             }
//         });
//         if ((!$('.steps').valid())) {
//             return true;
//         }
//         if (animating) return false;
//         animating = true;
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//         next_fs.show();
//         current_fs.animate({
//             opacity: 0
//         }, {
//             step: function(now, mx) {
//                 scale = 1 - (1 - now) * 0.2;
//                 left = (now * 50) + "%";
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'transform': 'scale(' + scale + ')'
//                 });
//                 next_fs.css({
//                     'left': left,
//                     'opacity': opacity
//                 });
//             },
//             duration: 800,
//             complete: function() {
//                 current_fs.hide();
//                 animating = false;
//             },
//             easing: 'easeInOutExpo'
//         });
//     });
//     $(".submit").click(function() {
//         $(".steps").validate({
//             errorClass: 'invalid',
//             errorElement: 'span',
//             errorPlacement: function(error, element) {
//                 error.insertAfter(element.next('span').children());
//             },
//             highlight: function(element) {
//                 $(element).next('span').show();
//             },
//             unhighlight: function(element) {
//                 $(element).next('span').hide();
//             }
//         });
//         if ((!$('.steps').valid())) {
//             return false;
//         }
//         if (animating) return false;
//         animating = true;
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//         next_fs.show();
//         current_fs.animate({
//             opacity: 0
//         }, {
//             step: function(now, mx) {
//                 scale = 1 - (1 - now) * 0.2;
//                 left = (now * 50) + "%";
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'transform': 'scale(' + scale + ')'
//                 });
//                 next_fs.css({
//                     'left': left,
//                     'opacity': opacity
//                 });
//             },
//             duration: 800,
//             complete: function() {
//                 current_fs.hide();
//                 animating = false;
//             },
//             easing: 'easeInOutExpo'
//         });
//     });
//     $(".previous").click(function() {
//         if (animating) return false;
//         animating = true;
//         current_fs = $(this).parent();
//         previous_fs = $(this).parent().prev();
//         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
//         previous_fs.show();
//         current_fs.animate({
//             opacity: 0
//         }, {
//             step: function(now, mx) {
//                 scale = 0.8 + (1 - now) * 0.2;
//                 left = ((1 - now) * 50) + "%";
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'left': left
//                 });
//                 previous_fs.css({
//                     'transform': 'scale(' + scale + ')',
//                     'opacity': opacity
//                 });
//             },
//             duration: 800,
//             complete: function() {
//                 current_fs.hide();
//                 animating = false;
//             },
//             easing: 'easeInOutExpo'
//         });
//     });
// });
// jQuery(document).ready(function() {
//     jQuery("#edit-submitted-acquisition-amount-1,#edit-submitted-acquisition-amount-2,#edit-submitted-cultivation-amount-1,#edit-submitted-cultivation-amount-2,#edit-submitted-cultivation-amount-3,#edit-submitted-cultivation-amount-4,#edit-submitted-retention-amount-1,#edit-submitted-retention-amount-2,#edit-submitted-constituent-base-total-constituents").keyup(function() {
//         calcTotal();
//     });
// });

// function calcTotal() {
//     var grade = 0;
//     var donorTotal = Number(jQuery("#edit-submitted-constituent-base-total-constituents").val().replace(/,/g, ""));
//     if (donorTotal) {
//         donorTotal = parseFloat(donorTotal);
//     } else {
//         donorTotal = 0;
//     }
//     grade += getBonusDonorPoints(donorTotal);
//     var acqAmount1 = Number(jQuery("#edit-submitted-acquisition-amount-1").val().replace(/,/g, ""));
//     var acqAmount2 = Number(jQuery("#edit-submitted-acquisition-amount-2").val().replace(/,/g, ""));
//     var acqTotal = 0;
//     if (acqAmount1) {
//         acqAmount1 = parseFloat(acqAmount1);
//     } else {
//         acqAmount1 = 0;
//     }
//     if (acqAmount2) {
//         acqAmount2 = parseFloat(acqAmount2);
//     } else {
//         acqAmount2 = 0;
//     }
//     if (acqAmount1 > 0 && acqAmount2 > 0) {
//         acqTotal = ((acqAmount2 - acqAmount1) / acqAmount1 * 100).toFixed(2);
//     } else {
//         acqTotal = 0;
//     }
//     jQuery("#edit-submitted-acquisition-percent-change").val(acqTotal + '%');
//     grade += getAcquisitionPoints(acqTotal);
//     console.log(grade);
//     var cultAmount1 = Number(jQuery("#edit-submitted-cultivation-amount-1").val().replace(/,/g, ""));
//     var cultAmount2 = Number(jQuery("#edit-submitted-cultivation-amount-2").val().replace(/,/g, ""));
//     var cultTotal = 0;
//     if (cultAmount1) {
//         cultAmount1 = parseFloat(cultAmount1);
//     } else {
//         cultAmount1 = 0;
//     }
//     if (cultAmount2) {
//         cultAmount2 = parseFloat(cultAmount2);
//     } else {
//         cultAmount2 = 0;
//     }
//     if (cultAmount1 > 0 && cultAmount2 > 0) {
//         cultTotal = ((cultAmount2 - cultAmount1) / cultAmount1 * 100).toFixed(2);
//     } else {
//         cultTotal = 0;
//     }
//     jQuery("#edit-submitted-cultivation-percent-change1").val(cultTotal + '%');
//     grade += getAcquisitionPoints(cultTotal);
//     var cultAmount3 = Number(jQuery("#edit-submitted-cultivation-amount-3").val().replace(/,/g, ""));
//     var cultAmount4 = Number(jQuery("#edit-submitted-cultivation-amount-4").val().replace(/,/g, ""));
//     if (cultAmount3) {
//         cultAmount3 = parseFloat(cultAmount3);
//     } else {
//         cultAmount3 = 0;
//     }
//     if (cultAmount4) {
//         cultAmount4 = parseFloat(cultAmount4);
//     } else {
//         cultAmount4 = 0;
//     }
//     if (cultAmount3 > 0 && cultAmount4 > 0) {
//         cultTotal2 = ((cultAmount4 - cultAmount3) / cultAmount3 * 100).toFixed(2);
//     } else {
//         cultTotal2 = 0;
//     }
//     jQuery("#edit-submitted-cultivation-percent-change2").val(cultTotal2 + '%');
//     grade += getAcquisitionPoints(cultTotal2);
//     var retAmount1 = Number(jQuery("#edit-submitted-retention-amount-1").val().replace(/,/g, ""));
//     var retAmount2 = Number(jQuery("#edit-submitted-retention-amount-2").val().replace(/,/g, ""));
//     var retTotal = 0;
//     if (retAmount1) {
//         retAmount1 = parseFloat(retAmount1);
//     } else {
//         retAmount1 = 0;
//     }
//     if (retAmount2) {
//         retAmount2 = parseFloat(retAmount2);
//     } else {
//         retAmount2 = 0;
//     }
//     if (retAmount1 > 0 && retAmount2 > 0) {
//         retTotal = (retAmount2 / retAmount1 * 100).toFixed(2);
//     } else {
//         retTotal = 0;
//     }
//     jQuery("#edit-submitted-retention-percent-change").val(retTotal + '%');
//     grade += getAcquisitionPoints(retTotal);
//     jQuery("#edit-submitted-final-grade-grade").val(grade + ' / 400');
// }

// function getAcquisitionPoints(val) {
//     if (val < 1) {
//         return 0;
//     } else if (val >= 1 && val < 6) {
//         return 50;
//     } else if (val >= 6 && val < 11) {
//         return 60;
//     } else if (val >= 11 && val < 16) {
//         return 70;
//     } else if (val >= 16 && val < 21) {
//         return 75;
//     } else if (val >= 21 && val < 26) {
//         return 80;
//     } else if (val >= 26 && val < 31) {
//         return 85;
//     } else if (val >= 31 && val < 36) {
//         return 90;
//     } else if (val >= 36 && val < 41) {
//         return 95;
//     } else if (val >= 41) {
//         return 100;
//     }
// }

// function getCultivationGiftPoints(val) {
//     if (val < 1) {
//         return 0;
//     } else if (val >= 1 && val < 4) {
//         return 50;
//     } else if (val >= 4 && val < 7) {
//         return 60;
//     } else if (val >= 7 && val < 10) {
//         return 70;
//     } else if (val >= 10 && val < 13) {
//         return 75;
//     } else if (val >= 13 && val < 16) {
//         return 80;
//     } else if (val >= 16 && val < 21) {
//         return 85;
//     } else if (val >= 21 && val < 26) {
//         return 90;
//     } else if (val >= 26 && val < 51) {
//         return 95;
//     } else if (val >= 51) {
//         return 100;
//     }
// }

// function getCultivationDonationPoints(val) {
//     if (val < 1) {
//         return 0;
//     } else if (val >= 1 && val < 6) {
//         return 50;
//     } else if (val >= 6 && val < 11) {
//         return 60;
//     } else if (val >= 11 && val < 16) {
//         return 70;
//     } else if (val >= 16 && val < 21) {
//         return 75;
//     } else if (val >= 21 && val < 26) {
//         return 80;
//     } else if (val >= 26 && val < 31) {
//         return 85;
//     } else if (val >= 31 && val < 36) {
//         return 90;
//     } else if (val >= 36 && val < 41) {
//         return 95;
//     } else if (val >= 41) {
//         return 100;
//     }
// }

// function getRetentionPoints(val) {
//     if (val < 1) {
//         return 0;
//     } else if (val >= 1 && val < 51) {
//         return 50;
//     } else if (val >= 51 && val < 56) {
//         return 60;
//     } else if (val >= 56 && val < 61) {
//         return 70;
//     } else if (val >= 61 && val < 66) {
//         return 75;
//     } else if (val >= 66 && val < 71) {
//         return 80;
//     } else if (val >= 71 && val < 76) {
//         return 85;
//     } else if (val >= 76 && val < 81) {
//         return 90;
//     } else if (val >= 81 && val < 91) {
//         return 95;
//     } else if (val >= 91) {
//         return 100;
//     }
// }

// function getBonusDonorPoints(val) {
//     if (val < 10001) {
//         return 0;
//     } else if (val >= 10001 && val < 25001) {
//         return 10;
//     } else if (val >= 25001 && val < 50000) {
//         return 15;
//     } else if (val >= 50000) {
//         return 20;
//     }
// }
// var modules = {
//     $window: $(window),
//     $html: $('html'),
//     $body: $('body'),
//     $container: $('.container'),
//     init: function() {
//         $(function() {
//             modules.modals.init();
//         });
//     },
//     modals: {
//         trigger: $('.explanation'),
//         modal: $('.modal'),
//         scrollTopPosition: null,
//         init: function() {
//             var self = this;
//             if (self.trigger.length > 0 && self.modal.length > 0) {
//                 modules.$body.append('<div class="modal-overlay"></div>');
//                 self.triggers();
//             }
//         },
//         triggers: function() {
//             var self = this;
//             self.trigger.on('click', function(e) {
//                 e.preventDefault();
//                 var $trigger = $(this);
//                 self.openModal($trigger, $trigger.data('modalId'));
//             });
//             $('.modal-overlay').on('click', function(e) {
//                 e.preventDefault();
//                 self.closeModal();
//             });
//             modules.$body.on('keydown', function(e) {
//                 if (e.keyCode === 27) {
//                     self.closeModal();
//                 }
//             });
//             $('.modal-close').on('click', function(e) {
//                 e.preventDefault();
//                 self.closeModal();
//             });
//         },
//         openModal: function(_trigger, _modalId) {
//             var self = this,
//                 scrollTopPosition = modules.$window.scrollTop(),
//                 $targetModal = $('#' + _modalId);
//             self.scrollTopPosition = scrollTopPosition;
//             modules.$html.addClass('modal-show').attr('data-modal-effect', $targetModal.data('modal-effect'));
//             $targetModal.addClass('modal-show');
//             modules.$container.scrollTop(scrollTopPosition);
//         },
//         closeModal: function() {
//             var self = this;
//             $('.modal-show').removeClass('modal-show');
//             modules.$html.removeClass('modal-show').removeAttr('data-modal-effect');
//             modules.$window.scrollTop(self.scrollTopPosition);
//         }
//     }
// }
// modules.init();