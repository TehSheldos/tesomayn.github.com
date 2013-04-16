$(function(){
	var ae = "An error occurred with the jQuery AJAX request. Try again soon.";
	
	$("[rel^='tooltip'],[rel*='tooltip']").tooltip({"html":true});
	
	$("button.show_actions").each(function(i,a){
		$(a).click(function(){
			var downloadid = $(a).attr("data-downloadid");
			
			$(this).fadeOut(function(){
				$("div#" + downloadid + "_downloadstats").show("slide", {direction:"right"}, 1000);
			});
		});
	});
	
	$("button.hide_actions").each(function(i,a){
		$(a).click(function(){
			var downloadid = $(a).attr("data-downloadid");
			
			$("div#" + downloadid + "_downloadstats").hide("slide", {direction:"right"}, 1000, function(){
				$("button.show_actions[data-downloadid*='" + downloadid + "']").fadeIn();
			});
		});
	});
	
	$("button.like").each(function(i,a){
		$(a).click(function(){
			var downloadid = $(a).attr("data-downloadid");
			
			$.ajax({
				type: "POST",
				url: "inc/like.php",
				data: "DownloadID=" + downloadid,
				success: function(r){
					DDA(r);
				},
				error: function(){
					DDA(ae);
				}
			});
		});
	});
	
	$("button.dislike").each(function(i,a){
		$(a).click(function(){
			var downloadid = $(a).attr("data-downloadid");
			
			$.ajax({
				type: "POST",
				url: "inc/dislike.php",
				data: "DownloadID=" + downloadid,
				success: function(r){
					DDA(r);
				},
				error: function(){
					DDA(ae);
				}
			});
		});
	});
	
	$("button.download").each(function(i,a){
		$(a).click(function(){
			var downloadid = $(a).attr("data-downloadid");
			
			$.ajax({
				type: "POST",
				url: "inc/download.php",
				data: "DownloadID=" + downloadid,
				success: function(r){
					DDA(r);
					window.location = $(a).attr("data-downloadlink") + "";
				},
				error: function(){
					DDA(ae);
				}
			});
		});
	});
	
	$("select#price").change(function(){
		if ($(this).val() == "Free")
		{
			$("div#price_custom_div").fadeOut();
		}
		else
		{
			$("div#price_custom_div").fadeIn();
		}
	});
	
	$("form#add").submit(function(){
		$.ajax({
			type: "POST",
			url: "inc/add.php",
			data: $(this).serialize(),
			success: function(r){
				if (r == "ok")
				{
					$("form#add").fadeOut();
					DDA("The new download has been added!");
				}
				else
				{
					DDA(r);
				}
			},
			error: function(){
				DDA(ae);
			}
		});
		
		return false;
	});
	
	$("div#drop_down_bar").click(function(){
		$(this).hide();
	});
	
	function DDA(message) {
		$("div#drop_down_bar").text(message).slideDown(500, function(){
			$(this).effect("bounce", { times: 3 }, 650, function(){
				$(this).delay(4000).slideUp("slow");
			});
		});
	}
});