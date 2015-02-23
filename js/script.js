var card_container_width = $('#pack_cont').width();
var total_cards = $('.card').length; //any number of cards will work
var card_spacing = 10;

//shuffle plugin
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
//shuffle plugin


//bring cards to initail stacked position
function reset_cards(){
	//hide all cards faces
	$('.card').removeClass('open');
	//stack all cards
	stack_cards(0.2);
	//close all cards
	close_all_cards();
	//remove any rotation
	animate_card(0);
}

//stacks all card with a relative margin, to give a 3d effect
function stack_cards(margin){
	var left = 0;
	var step = margin;
	var i = 0;
	$('.card').each(function(){
		$(this).css({'z-index' : i});					
		$(this).css({'margin-left':left+'px'});
		$(this).css({'margin-top':0+'px'});
		left = left + step;
		i++;
	});
}

//rotate all cards to a specific degree
//rotates all card from 0 to deg range
function animate_card(deg){
	var start = 0;
	var end = deg;
	var step = deg/total_cards;
	var angle = 0;
	$('.card').each(function(){
		$(this).css({
					'transform' : 'rotate('+ angle +'deg)',
					'-webkit-transform' : 'rotate('+ angle +'deg)',
					'-moz-transform' : 'rotate('+ angle +'deg)',
					'-ms-transform' : 'rotate('+ angle +'deg)',
		});
		angle += step;
	});
}

//seprates all cards instantly, row wise
function separate_instantly(){
	var left = 0;
	var top = 0;
	var card_width = $('.card').width();
	var card_height = $('.card').height();
	var left_step =  card_width + card_spacing;

	$('.card').each(function(){
		$(this).css({
			'margin-top':top+'px',
			'margin-left':left+'px',
		});
		left = left + left_step;
		if(left+card_width + card_spacing > card_container_width)
		{
			left = 0;
			top += card_height + card_spacing;
		}
	});
}

//slowly separate all cards in a line
function separate_one_by_one(){
var left = 0;
var card_width = $('.card').width();
var card_height = $('.card').height();
//initial top margin for card placement
var top = card_height;
//initial left margin for card placement
var left_step =  card_width + card_spacing;
	
	//time lag between each card placement
	var sec_step = 100;
	var time = 0;

	//loop through all cards
	$('.card').each(function(){
		var card = $(this);
		setTimeout(function(){
			card.css({
				'margin-top':top+'px',
				'margin-left':left+'px',
			});

			left = left + left_step;
			//if card cannot fit in current row then place it card in next row
			if(left+card_width + card_spacing > card_container_width)
			{
				left = 0;
				top += card_height + card_spacing;
			}
		},time);
		//add time lag for next card placement
		time += sec_step;
	});
}

//show all card
function open_all_cards(){
	$('.card').addClass('open');
	setTimeout(function(){
		$('.card').addClass('opened');
	},300);
}

//hide all card faces
function close_all_cards(){
	$('.card').removeClass('open');
	setTimeout(function(){
		$('.card').removeClass('opened');
	},300);	
}


var madness_interval;
//do random things
function random_things(){
	separate_one_by_one();
	setTimeout(function(){
		separate_instantly();
		setTimeout(function(){
			open_all_cards();
			animate_card(Math.random() * 4000);
			setTimeout(function(){
				close_all_cards();
			},Math.random()*2400);

		},Math.random()*300);
	},Math.random()*3000);
}

//begin madness 
function begin_madness(){
	//stop earlier interval, if any
	stop_madness();
	//do random animations
	random_things();
	//do them repeatedly
	madness_interval = setInterval(function(){
		random_things();
	},500);	
}

//stop madness animation
function stop_madness(){
	clearInterval(madness_interval);
	setInterval(function(){
		reset_cards();	
	},2000);
}

//flower animation
function flower_animation(){
	animate_card(360);
	setTimeout(function(){
		open_all_cards();
		setTimeout(function(){
			close_all_cards();
			setTimeout(function(){
				reset_cards();
			},1000);
		},1000);		
	},1000);
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function shufle_cards(){
//shuffle all cards in DOM
$('.card').shuffle();

//create shuffle effect(just to show it to user)
var i = 0;
var time = 0;
var shuffle_time = 4;
var counter = 0;

$($('.card').get().reverse()).each(function(){
	var card = $(this);
	setTimeout(function(){
		card.animate({ 'margin-left' : '145px' },1);
		setTimeout(function(){
			card.animate({ 'z-index' : i });
			card.animate({ 'margin-left' : '0px' },20);
		},100);
		i++;
	},time);
	time += 600;
	counter++;
	//limit shuffle to specific no of times.
	if(counter > shuffle_time)
		return false;
});
reset_cards();

}

$(document).ready(function(){
	stack_cards(0.2);
		//card click event
		$('.card').click(function(){
			var card = $(this);
			card.toggleClass('open');
			setTimeout(function(){
				card.toggleClass('opened');
			},300);
		});

	//the game


});

