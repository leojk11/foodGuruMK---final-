<div class="floating_right_icon" id="show_filters">

<div class="flaoting_wrapper">

	
<div class="float_icon"><img src="icons/mascot.png"></div>


<div class="float_title">SELECT FILTER</div>	


</div><!--flaoting wrapper-->
</div><!--floating right-->


<div class="floating_modes" id="filters_on">
	<div class="fixed_pos">
	
<div class="filter_mode">
	<div class="filter_name">Normal Mode</div>
	<div class="slider_switch">
		<label class="switch">
			<input class="slider" type="checkBox" onchange="valueChanged()" value="1">
			<div class="slider round">
			
		</div>
	</label>
</div>
</div>
<div class="filter_mode">
	<div class="filter_name">Fitness Mode</div>
	<div class="slider_switch">
		<label class="switch">
			<input class="slider" type="checkBox" onchange="valueChanged()" value="1">
			<div class="slider round">
			
		</div>
	</label>
</div>
</div>
<div class="filter_mode">
	<div class="filter_name">Vegan Mode</div>
	<div class="slider_switch">
		<label class="switch">
			<input class="slider" type="checkBox" onchange="valueChanged()" value="1">
			<div class="slider round">
			
		</div>
	</label>
</div>
</div>

<div class="filter_mode">
	<div class="filter_name">Diet Mode</div>
	<div class="slider_switch">
		<label class="switch">
			<input class="slider" type="checkBox" onchange="valueChanged()" value="1">
			<div class="slider round">
			
		</div>
	</label>
</div>
</div>

<div class="filter_mode" style="border-bottom: none;">
	<div class="filter_name">Budget Mode</div>
	<div class="slider_switch">
		<label class="switch">
			<input class="slider" type="checkBox" onchange="valueChanged()" value="1">
			<div class="slider round">
			
		</div>
	</label>
</div>
</div>


</div><!--fixed pos-->
</div><!--floating modes-->




 <script type="text/javascript">
    $(document).ready(function(){
                $("#show_filters").click( function() { 
                  $("#filters_on").slideToggle('1000','linear');

                });
    });


    </script>