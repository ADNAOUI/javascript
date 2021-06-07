$(document).ready(function(){
	initPopovers();
	modalBottomSheets();
	emailFieldValidation();
	saisie();
	init();
 });

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
		console.log("init")
		fo.sms.value = "";
		fo.sms.focus();
		saisie();
	};

	function emailFieldValidation()
	{
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