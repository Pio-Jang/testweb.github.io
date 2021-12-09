if (window.console == undefined) {console={log:function(){} };}

(function ($, window, undefined){
	"use strict";
	var layerOpen = {
		/** 플러그인명 */
		bindjQuery: 'layerOpen',
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
		},
		initialize: function(layerID, origin){
			this._layerID = $(layerID);
			this._origin = origin;
			this._focusable = [];
			this._el_firstFocus = null;
			this._el_lastFocus = null;
			this._event();
		},
		_event: function(){
			var me = this,
			_layerID = me._layerID,
			_origin = me._origin,
			_focusable = me._focusable,
			_el_firstFocus = me._el_firstFocus,
			_el_lastFocus = me._el_lastFocus;

			_layerID.find('*').each(function(i, val) {
				if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute('tabIndex')) !== -1) {
					_focusable.push(val);
				}
				if((val.getAttribute('tabIndex') !== null) && (parseInt(val.getAttribute('tabIndex')) >= 0) && (val.getAttribute('tabIndex', 2) !== 32768)) {
					_focusable.push(val);
				}
			});

			_el_firstFocus = _focusable[0];
			_el_lastFocus = _focusable[_focusable.length-1];

			$(document).on({
				'keydown' : function(e){
					var keyCode = e.keyCode || e.which;
					if (keyCode == 27){
						_layerID.find('.dialog-close').click();
						$(document).off('keydown');
					}
				}
			});

			$(_el_firstFocus).on({
				'keydown' : function(e){
					if (e.target == this){
						var keyCode = e.keyCode || e.which;
						if (keyCode == 9){
							if (e.shiftKey){
								$(_el_lastFocus).focus();
								e.preventDefault();
							}
						}
					}
				}
			});

			$(_el_lastFocus).on({
				'keydown' : function(e){
					var keyCode = e.keyCode || e.which;
					if (keyCode == 9){
						if (!e.shiftKey){
							$(_el_firstFocus).focus();
							e.preventDefault();
						}
					}
				}
			});

			_layerID.find('.dialog-close').on('click',function(e){
				// _layerID.find('.animate').removeClass('active');
				_layerID.hide();
				$(_origin).focus();

				// var parentClass = _layerID.attr('class').split(' ');

				// if (!$('.' + parentClass[0]).is(':visible')) {
				// 	$('html').removeClass('oh');
				// };
				$('html').removeClass('oh');

				$(_el_firstFocus).off('keydown');
				$(_el_lastFocus).off('keydown');
				_layerID.find('.dialog-close').off('click');
				e.preventDefault();
			});
			// 딤클릭시 닫히게
			// _layerID.on('click',function(e){
			// 	if (e.target == this) {
			// 		_layerID.hide();
			// 		$(_origin).focus();
			// 		$('html').removeClass('oh');
			// 		$(_el_firstFocus).off('keydown');
			// 		$(_el_lastFocus).off('keydown');
			// 		_layerID.off('click');
			// 		e.preventDefault();
			// 	};
			// });
			$('html').addClass('oh');
			// _layerID.show().animate( { scrollTop : 0 }, 1 ).find($(_el_firstFocus)).focus();
			_layerID.show().scrollTop(0).find($(_el_firstFocus)).focus();
			// setTimeout(function(){
			// 	_layerID.find('.animate').addClass('active');
			// },50);
		},
		close: function(layerID, origin){
			var me = this,
			_layerID = $(layerID),
			_origin = origin,
			_focusable = me._focusable,
			_el_firstFocus = me._el_firstFocus,
			_el_lastFocus = me._el_lastFocus;

			_layerID.find('*').each(function(i, val) {
				if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute('tabIndex')) !== -1) {
					_focusable.push(val);
				}
				if((val.getAttribute('tabIndex') !== null) && (parseInt(val.getAttribute('tabIndex')) >= 0) && (val.getAttribute('tabIndex', 2) !== 32768)) {
					_focusable.push(val);
				}
			});

			_el_firstFocus = _focusable[0];
			_el_lastFocus = _focusable[_focusable.length-1];

			// _layerID.find('.animate').removeClass('active');
			_layerID.hide();
			$(_origin).focus();

			// var parentClass = _layerID.attr('class').split(' ');

			// if (!$('.' + parentClass[0]).is(':visible')) {
			// 	$('html').removeClass('oh');
			// };
			$('html').removeClass('oh');

			$(_el_firstFocus).off('keydown');
			$(_el_lastFocus).off('keydown');
			_layerID.find('.dialog-close').off('click');
		}
	};

	window.layerOpen = layerOpen;
}(jQuery, window));

(function ($, window, undefined){
	"use strict";
	var selOptionWidth = {
		/** 플러그인명 */
		bindjQuery: 'selOptionWidth',
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
		},
		initialize: function(target){
			this._target = $(target);
			this._selGap = null;
			this._gap();
			this._event();
		},
		_gap: function(){
			var me = this;
			if (me._selGap === null) {
				var $testSel = $('<select class="noArrow" style="position:absolute;top:-9999px;left:-9999px;margin:0;padding:0;border:0;font-family:sans-serif;font-style:normal;font-size:12px;font-weight:normal;"><option style="font-family:sans-serif;font-style:normal;font-size:12px;font-weight:normal;" selected></option></select>');
				$('body').append($testSel);
				me._selGap = $testSel.width();
				$testSel.remove();
			};
		},
		_event: function(){
			var me = this;
			me._target.on('change',function(){
				var $this = $(this),
					$opt = $this.find('option:selected'),
					$span = $('<span style="position:absolute;top:-9999px;left:-9999px;">').text($opt.text());
				$span.css({
					'font-family': $opt.css('font-family'),
					'font-style': $opt.css('font-style'),
					'font-weight': $opt.css('font-weight'),
					'font-size': $opt.css('font-size')
				});
				$('body').append($span);
				// $this.width($span.width() + me._selGap + 1);
				$this.width(Math.ceil($span[0].getBoundingClientRect().width) + me._selGap); //ie9+
				$span.remove();
			});
			me._target.trigger('change');
		}
	};

	window.selOptionWidth = selOptionWidth;
}(jQuery, window));

// 모듈
// ** layerOpen.initialize('여는레이어팝업', '닫히고포커스이동할곳');
// layerOpen.initialize('#ly-1', document);
// layerOpen.initialize('#ly-2', document);
// ** layerOpen.close('닫는레이어팝업', '닫히고포커스이동할곳');
// layerOpen.close('#ly-1', document);
// layerOpen.close('#ly-2', 'a:eq(0)');

$(document).ready(function(){

	// ipt-check-4 열고 닫힘
	var $iptCheck4 = $('.ipt-check-4');
	if ($iptCheck4.length > 0) {
		$iptCheck4.each(function(idx, e){
			var $this = $(e);
			if (e.checked) {
				$this.siblings('.terms-wrap').hide();
			}else{
				$this.siblings('.terms-wrap').show();
			}
		});
		$iptCheck4.on('change',function(e){
			var $this = $(e.target);
			if (e.target.checked) {
				$this.siblings('.terms-wrap').stop().slideUp(200);
			}else{
				$this.siblings('.terms-wrap').stop().slideDown(200);
			}
		});
	};

	// sel-type-1 선택된 옵션값 너비로 만들기
	var $selType1 = $('.sel-type-1');
	if ($selType1.length > 0) {
		selOptionWidth.initialize('.sel-type-1');
	};

});
