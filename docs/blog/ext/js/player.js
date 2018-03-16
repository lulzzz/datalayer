/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.YTPlayer.src.js                                                                                                                  _
 _ last modified: 01/07/15 19.35                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/
var ytp = ytp || {};

function onYouTubeIframeAPIReady() {
		if( ytp.YTAPIReady ) return;
		ytp.YTAPIReady = true;
		$( document ).trigger( "YTAPIReady" );
}

var getYTPVideoID = function( url ) {
		var videoID, playlistID;
		if( url.indexOf( "youtu.be" ) > 0 ) {
				videoID = url.substr( url.lastIndexOf( "/" ) + 1, url.length );
				playlistID = videoID.indexOf( "?list=" ) > 0 ? videoID.substr( videoID.lastIndexOf( "=" ), videoID.length ) : null;
				videoID = playlistID ? videoID.substr( 0, videoID.lastIndexOf( "?" ) ) : videoID;
		} else if( url.indexOf( "http" ) > -1 ) {
				videoID = url.match( /[\\?&]v=([^&#]*)/ )[ 1 ];
				playlistID = url.indexOf( "list=" ) > 0 ? url.match( /[\\?&]list=([^&#]*)/ )[ 1 ] : null;
		} else {
				videoID = url.length > 15 ? null : url;
				playlistID = videoID ? null : url;
		}
		return {
				videoID: videoID,
				playlistID: playlistID
		};
};

( function( $, ytp ) {

		$.mbYTPlayer = {
				name: "jquery.mb.YTPlayer",
				version: "2.9.4",
				build: "{{ build }}",
				author: "Matteo Bicocchi",
				apiKey: "",
				defaults: {
						containment: "body",
						ratio: "auto", // "auto", "16/9", "4/3"
						videoURL: null,
						playlistURL: null,
						startAt: 0,
						stopAt: 0,
						autoPlay: true,
						vol: 50, // 1 to 100
						addRaster: false,
						opacity: 1,
						quality: "default", //or â€œsmallâ€, â€œmediumâ€, â€œlargeâ€, â€œhd720â€, â€œhd1080â€, â€œhighresâ€
						mute: false,
						loop: true,
						showControls: true,
						showAnnotations: false,
						showYTLogo: true,
						stopMovieOnBlur: true,
						realfullscreen: true,
						gaTrack: true,
						optimizeDisplay: true,
						onReady: function( player ) {}
				},
				/* @fontface icons */
				controls: {
						play: "P",
						pause: "p",
						mute: "M",
						unmute: "A",
						onlyYT: "O",
						showSite: "R",
						ytLogo: "Y"
				},
				locationProtocol: "https:",
				/**
				 *
				 * @param options
				 * @returns [players]
				 */
				buildPlayer: function( options ) {
						return this.each( function() {
								var YTPlayer = this;
								var $YTPlayer = $( YTPlayer );
								YTPlayer.loop = 0;
								YTPlayer.opt = {};
								YTPlayer.state = {};
								YTPlayer.filtersEnabled = true;
								YTPlayer.filters = {
										grayscale: {
												value: 0,
												unit: "%"
										},
										hue_rotate: {
												value: 0,
												unit: "deg"
										},
										invert: {
												value: 0,
												unit: "%"
										},
										opacity: {
												value: 0,
												unit: "%"
										},
										saturate: {
												value: 0,
												unit: "%"
										},
										sepia: {
												value: 0,
												unit: "%"
										},
										brightness: {
												value: 0,
												unit: "%"
										},
										contrast: {
												value: 0,
												unit: "%"
										},
										blur: {
												value: 0,
												unit: "px"
										}
								};
								$YTPlayer.addClass( "mb_YTPlayer" );
								var property = $YTPlayer.data( "property" ) && typeof $YTPlayer.data( "property" ) == "string" ? eval( '(' + $YTPlayer.data( "property" ) + ')' ) : $YTPlayer.data( "property" );
								if( typeof property != "undefined" && typeof property.vol != "undefined" ) property.vol = property.vol === 0 ? property.vol = 1 : property.vol;
								$.extend( YTPlayer.opt, $.mbYTPlayer.defaults, options, property );
								if( !YTPlayer.hasChanged ) {
										YTPlayer.defaultOpt = {};
										$.extend( YTPlayer.defaultOpt, $.mbYTPlayer.defaults, options, property );
								}
								YTPlayer.isRetina = ( window.retina || window.devicePixelRatio > 1 );
								var isIframe = function() {
										var isIfr = false;
										try {
												if( self.location.href != top.location.href ) isIfr = true;
										} catch( e ) {
												isIfr = true;
										}
										return isIfr;
								};
								YTPlayer.canGoFullScreen = !( $.browser.msie || $.browser.opera || isIframe() );
								if( !YTPlayer.canGoFullScreen ) YTPlayer.opt.realfullscreen = false;
								if( !$YTPlayer.attr( "id" ) ) $YTPlayer.attr( "id", "video_" + new Date().getTime() );
								var playerID = "mbYTP_" + YTPlayer.id;
								YTPlayer.isAlone = false;
								YTPlayer.hasFocus = true;
								var videoID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).videoID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).videoID : false;
								var playlistID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).playlistID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).playlistID : false;
								YTPlayer.videoID = videoID;
								YTPlayer.playlistID = playlistID;
								YTPlayer.opt.showAnnotations = ( YTPlayer.opt.showAnnotations ) ? '0' : '3';
								var playerVars = {
										'autoplay': 0,
										'modestbranding': 1,
										'controls': 0,
										'showinfo': 0,
										'rel': 0,
										'enablejsapi': 1,
										'version': 3,
										'playerapiid': playerID,
										'origin': '*',
										'allowfullscreen': true,
										'wmode': 'transparent',
										'iv_load_policy': YTPlayer.opt.showAnnotations
								};
								if( document.createElement( 'video' ).canPlayType ) $.extend( playerVars, {
										'html5': 1
								} );
								if( $.browser.msie && $.browser.version < 9 ) this.opt.opacity = 1;
								var playerBox = $( "<div/>" ).attr( "id", playerID ).addClass( "playerBox" );
								var overlay = $( "<div/>" ).css( {
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%"
								} ).addClass( "YTPOverlay" );
								YTPlayer.isSelf = YTPlayer.opt.containment == "self";
								YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? $( this ) : $( YTPlayer.opt.containment );
								YTPlayer.isBackground = YTPlayer.opt.containment.get( 0 ).tagName.toLowerCase() == "body";
								if( YTPlayer.isBackground && ytp.backgroundIsInited ) return;
								var isPlayer = YTPlayer.opt.containment.is( $( this ) );
								YTPlayer.canPlayOnMobile = isPlayer && $( this ).children().length === 0;
								if( !isPlayer ) {
										$YTPlayer.hide();
								} else {
										YTPlayer.isPlayer = true;
								}
								if( $.browser.mobile && !YTPlayer.canPlayOnMobile ) {
										$YTPlayer.remove();
										return;
								}
								var wrapper = $( "<div/>" ).addClass( "mbYTP_wrapper" ).attr( "id", "wrapper_" + playerID );
								wrapper.css( {
										position: "absolute",
										zIndex: 0,
										minWidth: "100%",
										minHeight: "100%",
										left: 0,
										top: 0,
										overflow: "hidden",
										opacity: 0
								} );
								playerBox.css( {
										position: "absolute",
										zIndex: 0,
										width: "100%",
										height: "100%",
										top: 0,
										left: 0,
										overflow: "hidden"
								} );
								wrapper.append( playerBox );
								YTPlayer.opt.containment.children().not( "script, style" ).each( function() {
										if( $( this ).css( "position" ) == "static" ) $( this ).css( "position", "relative" );
								} );
								if( YTPlayer.isBackground ) {
										$( "body" ).css( {
												boxSizing: "border-box"
										} );
										wrapper.css( {
												position: "fixed",
												top: 0,
												left: 0,
												zIndex: 0
										} );
										$YTPlayer.hide();
								} else if( YTPlayer.opt.containment.css( "position" ) == "static" ) YTPlayer.opt.containment.css( {
										position: "relative"
								} );
								YTPlayer.opt.containment.prepend( wrapper );
								YTPlayer.wrapper = wrapper;
								playerBox.css( {
										opacity: 1
								} );
								if( !$.browser.mobile ) {
										playerBox.after( overlay );
										YTPlayer.overlay = overlay;
								}
								if( !YTPlayer.isBackground ) {
										overlay.on( "mouseenter", function() {
												if( YTPlayer.controlBar ) YTPlayer.controlBar.addClass( "visible" );
										} ).on( "mouseleave", function() {
												if( YTPlayer.controlBar ) YTPlayer.controlBar.removeClass( "visible" );
										} )
								}
								if( !ytp.YTAPIReady ) {
										$( "#YTAPI" ).remove();
										var tag = $( "<script></script>" ).attr( {
												"src": $.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + $.mbYTPlayer.version,
												"id": "YTAPI"
										} );
										$( "head" ).prepend( tag );
								} else {
										setTimeout( function() {
												$( document ).trigger( "YTAPIReady" );
										}, 100 )
								}
								$( document ).on( "YTAPIReady", function() {
										if( ( YTPlayer.isBackground && ytp.backgroundIsInited ) || YTPlayer.isInit ) return;
										if( YTPlayer.isBackground ) {
												ytp.backgroundIsInited = true;
										}
										YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == "undefined" ? ( YTPlayer.isBackground ? true : false ) : YTPlayer.opt.autoPlay;
										YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
										$.mbYTPlayer.getDataFromAPI( YTPlayer );
										$( YTPlayer ).on( "YTPChanged", function() {
												if( YTPlayer.isInit ) return;
												YTPlayer.isInit = true;
												//if is mobile && isPlayer fallback to the default YT player
												if( $.browser.mobile && YTPlayer.canPlayOnMobile ) {
														// Try to adjust the player dimention
														if( YTPlayer.opt.containment.outerWidth() > $( window ).width() ) {
																YTPlayer.opt.containment.css( {
																		maxWidth: "100%"
																} );
																var h = YTPlayer.opt.containment.outerWidth() * .6;
																YTPlayer.opt.containment.css( {
																		maxHeight: h
																} );
														}
														new YT.Player( playerID, {
																videoId: YTPlayer.videoID.toString(),
																height: '100%',
																width: '100%',
																events: {
																		'onReady': function( event ) {
																				YTPlayer.player = event.target;
																				playerBox.css( {
																						opacity: 1
																				} );
																				YTPlayer.wrapper.css( {
																						opacity: 1
																				} );
																		}
																}
														} );
														return;
												}
												new YT.Player( playerID, {
														videoId: YTPlayer.videoID.toString(),
														playerVars: playerVars,
														events: {
																'onReady': function( event ) {
																		YTPlayer.player = event.target;
																		if( YTPlayer.isReady ) return;
																		YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? false : true;
																		YTPlayer.playerEl = YTPlayer.player.getIframe();
																		$YTPlayer.optimizeDisplay();
																		YTPlayer.videoID = videoID;
																		$( window ).on( "resize.YTP", function() {
																				$YTPlayer.optimizeDisplay();
																		} );
																		$.mbYTPlayer.checkForState( YTPlayer );
																		// Trigger state events
																		var YTPEvent = $.Event( "YTPUnstarted" );
																		YTPEvent.time = YTPlayer.player.time;
																		if( YTPlayer.canTrigger ) $( YTPlayer ).trigger( YTPEvent );
																},
																/**
																 *
																 * @param event
																 *
																 * -1 (unstarted)
																 * 0 (ended)
																 * 1 (playing)
																 * 2 (paused)
																 * 3 (buffering)
																 * 5 (video cued).
																 *
																 *
																 */
																'onStateChange': function( event ) {
																		if( typeof event.target.getPlayerState != "function" ) return;
																		var state = event.target.getPlayerState();
																		if( YTPlayer.state == state ) return;
																		YTPlayer.state = state;
																		var eventType;
																		switch( state ) {
																				case -1: //------------------------------------------------ unstarted
																						eventType = "YTPUnstarted";
																						break;
																				case 0: //------------------------------------------------ ended
																						eventType = "YTPEnd";
																						break;
																				case 1: //------------------------------------------------ play
																						eventType = "YTPStart";
																						if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $.mbYTPlayer.controls.pause );
																						if( typeof _gaq != "undefined" && eval( YTPlayer.opt.gaTrack ) ) _gaq.push( [ '_trackEvent', 'YTPlayer', 'Play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) ] );
																						if( typeof ga != "undefined" && eval( YTPlayer.opt.gaTrack ) ) ga( 'send', 'event', 'YTPlayer', 'play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) );
																						break;
																				case 2: //------------------------------------------------ pause
																						eventType = "YTPPause";
																						if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $.mbYTPlayer.controls.play );
																						break;
																				case 3: //------------------------------------------------ buffer
																						YTPlayer.player.setPlaybackQuality( YTPlayer.opt.quality );
																						eventType = "YTPBuffering";
																						if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $.mbYTPlayer.controls.play );
																						break;
																				case 5: //------------------------------------------------ cued
																						eventType = "YTPCued";
																						break;
																				default:
																						break;
																		}
																		// Trigger state events
																		var YTPEvent = $.Event( eventType );
																		YTPEvent.time = YTPlayer.player.time;
																		if( YTPlayer.canTrigger ) $( YTPlayer ).trigger( YTPEvent );
																},
																/**
																 *
																 * @param e
																 */
																'onPlaybackQualityChange': function( e ) {
																		var quality = e.target.getPlaybackQuality();
																		var YTPQualityChange = $.Event( "YTPQualityChange" );
																		YTPQualityChange.quality = quality;
																		$( YTPlayer ).trigger( YTPQualityChange );
																},
																/**
																 *
																 * @param err
																 */
																'onError': function( err ) {
																		if( err.data == 150 ) {
																				console.log( "Embedding this video is restricted by Youtube." );
																				if( YTPlayer.isPlayList ) $( YTPlayer ).playNext();
																		}
																		if( err.data == 2 && YTPlayer.isPlayList ) $( YTPlayer ).playNext();
																		if( typeof YTPlayer.opt.onError == "function" ) YTPlayer.opt.onError( $YTPlayer, err );
																}
														}
												} );
										} );
								} )
						} );
				},
				/**
				 *
				 * @param YTPlayer
				 */
				getDataFromAPI: function( YTPlayer ) {
						YTPlayer.videoData = $.mbStorage.get( "YTPlayer_data_" + YTPlayer.videoID );
						$( YTPlayer ).off( "YTPData.YTPlayer" ).on( "YTPData.YTPlayer", function() {
								if( YTPlayer.hasData ) {

										if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
												var bgndURL = YTPlayer.videoData.thumb_max || YTPlayer.videoData.thumb_high || YTPlayer.videoData.thumb_medium;
												YTPlayer.opt.containment.css( {
														background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
														backgroundSize: "cover"
												} );
												YTPlayer.opt.backgroundUrl = bgndURL;
										}
								}
						} );

						if( YTPlayer.videoData ) {

								setTimeout( function() {
										YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
										YTPlayer.dataReceived = true;
										$( YTPlayer ).trigger( "YTPChanged" );
										var YTPData = $.Event( "YTPData" );
										YTPData.prop = {};
										for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
										$( YTPlayer ).trigger( YTPData );
								}, 500 );

								YTPlayer.hasData = true;
						} else if( $.mbYTPlayer.apiKey ) {
								// Get video info from API3 (needs api key)
								// snippet,player,contentDetails,statistics,status
								$.getJSON( $.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + YTPlayer.videoID + "&key=" + $.mbYTPlayer.apiKey + "&part=snippet", function( data ) {
										YTPlayer.dataReceived = true;
										$( YTPlayer ).trigger( "YTPChanged" );

										function parseYTPlayer_data( data ) {
												YTPlayer.videoData = {};
												YTPlayer.videoData.id = YTPlayer.videoID;
												YTPlayer.videoData.channelTitle = data.channelTitle;
												YTPlayer.videoData.title = data.title;
												YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring( 0, 400 ) + " ...";
												YTPlayer.videoData.aspectratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
												YTPlayer.opt.ratio = YTPlayer.videoData.aspectratio;
												YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null;
												YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null;
												YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null;
												$.mbStorage.set( "YTPlayer_data_" + YTPlayer.videoID, YTPlayer.videoData );
										}
										parseYTPlayer_data( data.items[ 0 ].snippet );
										YTPlayer.hasData = true;
										var YTPData = $.Event( "YTPData" );
										YTPData.prop = {};
										for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
										$( YTPlayer ).trigger( YTPData );
								} );
						} else {
								setTimeout( function() {
										$( YTPlayer ).trigger( "YTPChanged" );
								}, 50 );
								if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
										var bgndURL = $.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + YTPlayer.videoID + "/hqdefault.jpg";
										YTPlayer.opt.containment.css( {
												background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
												backgroundSize: "cover"
										} );
										YTPlayer.opt.backgroundUrl = bgndURL;
								}
								YTPlayer.videoData = null;
								YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
						}
						if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
								YTPlayer.loading = $( "<div/>" ).addClass( "loading" ).html( "Loading" ).hide();
								$( YTPlayer ).append( YTPlayer.loading );
								YTPlayer.loading.fadeIn();
						}
				},
				/**
				 *
				 */
				removeStoredData: function() {
						$.mbStorage.remove();
				},
				/**
				 *
				 * @returns {*|YTPlayer.videoData}
				 */
				getVideoData: function() {
						var YTPlayer = this.get( 0 );
						return YTPlayer.videoData;
				},
				/**
				 *
				 * @returns {*|YTPlayer.videoID|boolean}
				 */
				getVideoID: function() {
						var YTPlayer = this.get( 0 );
						return YTPlayer.videoID || false;
				},
				/**
				 *
				 * @param quality
				 */
				setVideoQuality: function( quality ) {
						var YTPlayer = this.get( 0 );
						if( !$.browser.chrome ) YTPlayer.player.setPlaybackQuality( quality );
				},
				/**
				 * @param videos
				 * @param shuffle
				 * @param callback
				 * @returns {$.mbYTPlayer}
				 */
				playlist: function( videos, shuffle, callback ) {
						var $YTPlayer = this;
						var YTPlayer = $YTPlayer.get( 0 );
						YTPlayer.isPlayList = true;
						if( shuffle ) videos = $.shuffle( videos );
						if( !YTPlayer.videoID ) {
								YTPlayer.videos = videos;
								YTPlayer.videoCounter = 0;
								YTPlayer.videoLength = videos.length;
								$( YTPlayer ).data( "property", videos[ 0 ] );
								$( YTPlayer ).mb_YTPlayer();
						}
						if( typeof callback == "function" ) $( YTPlayer ).one( "YTPChanged", function() {
								callback( YTPlayer );
						} );
						$( YTPlayer ).on( "YTPEnd", function() {
								$( YTPlayer ).playNext();
						} );
						return $YTPlayer;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				playNext: function() {
						var YTPlayer = this.get( 0 );
						YTPlayer.videoCounter++;
						if( YTPlayer.videoCounter >= YTPlayer.videoLength ) YTPlayer.videoCounter = 0;
						$( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				playPrev: function() {
						var YTPlayer = this.get( 0 );
						YTPlayer.videoCounter--;
						if( YTPlayer.videoCounter < 0 ) YTPlayer.videoCounter = YTPlayer.videoLength - 1;
						$( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
						return this;
				},
				/**
				 *
				 * @param opt
				 */
				changeMovie: function( opt ) {
						var YTPlayer = this.get( 0 );
						YTPlayer.opt.startAt = 0;
						YTPlayer.opt.stopAt = 0;
						YTPlayer.opt.mute = true;
						YTPlayer.hasData = false;
						YTPlayer.hasChanged = true;
						if( opt ) $.extend( YTPlayer.opt, YTPlayer.defaultOpt, opt );
						YTPlayer.videoID = getYTPVideoID( YTPlayer.opt.videoURL ).videoID;
						$( YTPlayer.playerEl ).CSSAnimate( {
								opacity: 0
						}, 200, function() {
								$( YTPlayer ).YTPGetPlayer().cueVideoByUrl( encodeURI( $.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + YTPlayer.videoID ), 1, YTPlayer.opt.quality );
								$.mbYTPlayer.checkForState( YTPlayer );
								$( YTPlayer ).optimizeDisplay();
								$.mbYTPlayer.getDataFromAPI( YTPlayer );
								return this;
						} );
				},
				/**
				 *
				 * @returns {player}
				 */
				getPlayer: function() {
						return $( this ).get( 0 ).player;
				},
				playerDestroy: function() {
						var YTPlayer = this.get( 0 );
						ytp.YTAPIReady = false;
						ytp.backgroundIsInited = false;
						YTPlayer.isInit = false;
						YTPlayer.videoID = null;
						var playerBox = YTPlayer.wrapper;
						playerBox.remove();
						$( "#controlBar_" + YTPlayer.id ).remove();
						clearInterval( YTPlayer.checkForStartAt );
						clearInterval( YTPlayer.getState );
						return this;
				},
				/**
				 *
				 * @param real
				 * @returns {$.mbYTPlayer}
				 */
				fullscreen: function( real ) {
						var YTPlayer = this.get( 0 );
						if( typeof real == "undefined" ) real = YTPlayer.opt.realfullscreen;
						real = eval( real );
						var controls = $( "#controlBar_" + YTPlayer.id );
						var fullScreenBtn = controls.find( ".mb_OnlyYT" );
						var videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
						//var videoWrapper = YTPlayer.wrapper;
						if( real ) {
								var fullscreenchange = $.browser.mozilla ? "mozfullscreenchange" : $.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
								$( document ).off( fullscreenchange ).on( fullscreenchange, function() {
										var isFullScreen = RunPrefixMethod( document, "IsFullScreen" ) || RunPrefixMethod( document, "FullScreen" );
										if( !isFullScreen ) {
												YTPlayer.isAlone = false;
												fullScreenBtn.html( $.mbYTPlayer.controls.onlyYT );
												$( YTPlayer ).YTPSetVideoQuality( YTPlayer.opt.quality );
												videoWrapper.removeClass( "fullscreen" );
												videoWrapper.CSSAnimate( {
														opacity: YTPlayer.opt.opacity
												}, 500 );
												videoWrapper.css( {
														zIndex: 0
												} );
												if( YTPlayer.isBackground ) {
														$( "body" ).after( controls );
												} else {
														YTPlayer.wrapper.before( controls );
												}
												$( window ).resize();
												$( YTPlayer ).trigger( "YTPFullScreenEnd" );
										} else {
												$( YTPlayer ).YTPSetVideoQuality( "default" );
												$( YTPlayer ).trigger( "YTPFullScreenStart" );
										}
								} );
						}
						if( !YTPlayer.isAlone ) {
								function hideMouse() {
										YTPlayer.overlay.css( {
												cursor: "none"
										} );
								}
								$( document ).on( "mousemove.YTPlayer", function( e ) {
										YTPlayer.overlay.css( {
												cursor: "auto"
										} );
										clearTimeout( YTPlayer.hideCursor );
										if( !$( e.target ).parents().is( ".mb_YTPBar" ) ) YTPlayer.hideCursor = setTimeout( hideMouse, 3000 );
								} );
								hideMouse();
								if( real ) {
										videoWrapper.css( {
												opacity: 0
										} );
										videoWrapper.addClass( "fullscreen" );
										launchFullscreen( videoWrapper.get( 0 ) );
										setTimeout( function() {
												videoWrapper.CSSAnimate( {
														opacity: 1
												}, 1000 );
												YTPlayer.wrapper.append( controls );
												$( YTPlayer ).optimizeDisplay();
												YTPlayer.player.seekTo( YTPlayer.player.getCurrentTime() + .1, true );
										}, 500 )
								} else videoWrapper.css( {
										zIndex: 10000
								} ).CSSAnimate( {
										opacity: 1
								}, 1000 );
								fullScreenBtn.html( $.mbYTPlayer.controls.showSite );
								YTPlayer.isAlone = true;
						} else {
								$( document ).off( "mousemove.YTPlayer" );
								YTPlayer.overlay.css( {
										cursor: "auto"
								} );
								if( real ) {
										cancelFullscreen();
								} else {
										videoWrapper.CSSAnimate( {
												opacity: YTPlayer.opt.opacity
										}, 500 );
										videoWrapper.css( {
												zIndex: 0
										} );
								}
								fullScreenBtn.html( $.mbYTPlayer.controls.onlyYT );
								YTPlayer.isAlone = false;
						}

						function RunPrefixMethod( obj, method ) {
								var pfx = [ "webkit", "moz", "ms", "o", "" ];
								var p = 0,
										m, t;
								while( p < pfx.length && !obj[ m ] ) {
										m = method;
										if( pfx[ p ] == "" ) {
												m = m.substr( 0, 1 ).toLowerCase() + m.substr( 1 );
										}
										m = pfx[ p ] + m;
										t = typeof obj[ m ];
										if( t != "undefined" ) {
												pfx = [ pfx[ p ] ];
												return( t == "function" ? obj[ m ]() : obj[ m ] );
										}
										p++;
								}
						}

						function launchFullscreen( element ) {
								RunPrefixMethod( element, "RequestFullScreen" );
						}

						function cancelFullscreen() {
								if( RunPrefixMethod( document, "FullScreen" ) || RunPrefixMethod( document, "IsFullScreen" ) ) {
										RunPrefixMethod( document, "CancelFullScreen" );
								}
						}
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				toggleLoops: function() {
						var YTPlayer = this.get( 0 );
						var data = YTPlayer.opt;
						if( data.loop == 1 ) {
								data.loop = 0;
						} else {
								if( data.startAt ) {
										YTPlayer.player.seekTo( data.startAt );
								} else {
										YTPlayer.player.playVideo();
								}
								data.loop = 1;
						}
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				play: function() {
						var YTPlayer = this.get( 0 );
						if( !YTPlayer.isReady ) return;
						var controls = $( "#controlBar_" + YTPlayer.id );
						var playBtn = controls.find( ".mb_YTPPlaypause" );
						playBtn.html( $.mbYTPlayer.controls.pause );
						YTPlayer.player.playVideo();
						YTPlayer.wrapper.CSSAnimate( {
								opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
						}, 0 );
						$( YTPlayer.playerEl ).CSSAnimate( {
								opacity: 1
						}, 1000 );
						$( YTPlayer ).css( "background-image", "none" );
						return this;
				},
				/**
				 *
				 * @param callback
				 * @returns {$.mbYTPlayer}
				 */
				togglePlay: function( callback ) {
						var YTPlayer = this.get( 0 );
						if( YTPlayer.state == 1 ) this.YTPPause();
						else this.YTPPlay();
						if( typeof callback == "function" ) {
								callback( YTPlayer.state );
						}
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				stop: function() {
						var YTPlayer = this.get( 0 );
						var controls = $( "#controlBar_" + YTPlayer.id );
						var playBtn = controls.find( ".mb_YTPPlaypause" );
						playBtn.html( $.mbYTPlayer.controls.play );
						YTPlayer.player.stopVideo();
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				pause: function() {
						var YTPlayer = this.get( 0 );
						var controls = $( "#controlBar_" + YTPlayer.id );
						var playBtn = controls.find( ".mb_YTPPlaypause" );
						playBtn.html( $.mbYTPlayer.controls.play );
						YTPlayer.player.pauseVideo();
						return this;
				},
				/**
				 *
				 * @param val
				 * @returns {$.mbYTPlayer}
				 */
				seekTo: function( val ) {
						var YTPlayer = this.get( 0 );
						YTPlayer.player.seekTo( val, true );
						return this;
				},
				/**
				 *
				 * @param val
				 * @returns {$.mbYTPlayer}
				 */
				setVolume: function( val ) {
						var YTPlayer = this.get( 0 );
						if( !val && !YTPlayer.opt.vol && YTPlayer.player.getVolume() == 0 ) $( YTPlayer ).YTPUnmute();
						else if( ( !val && YTPlayer.player.getVolume() > 0 ) || ( val && YTPlayer.opt.vol == val ) ) {
								if( !YTPlayer.isMute ) $( YTPlayer ).YTPMute();
								else $( YTPlayer ).YTPUnmute();
						} else {
								YTPlayer.opt.vol = val;
								YTPlayer.player.setVolume( YTPlayer.opt.vol );
								if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( val )
						}
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				mute: function() {
						var YTPlayer = this.get( 0 );
						if( YTPlayer.isMute ) return;
						YTPlayer.player.mute();
						YTPlayer.isMute = true;
						YTPlayer.player.setVolume( 0 );
						if( YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10 ) {
								YTPlayer.volumeBar.updateSliderVal( 0 );
						}
						var controls = $( "#controlBar_" + YTPlayer.id );
						var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
						muteBtn.html( $.mbYTPlayer.controls.unmute );
						$( YTPlayer ).addClass( "isMuted" );
						if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.addClass( "muted" );
						var YTPEvent = $.Event( "YTPMuted" );
						YTPEvent.time = YTPlayer.player.time;
						if( YTPlayer.canTrigger ) $( YTPlayer ).trigger( YTPEvent );
						return this;
				},
				/**
				 *
				 * @returns {$.mbYTPlayer}
				 */
				unmute: function() {
						var YTPlayer = this.get( 0 );
						if( !YTPlayer.isMute ) return;
						YTPlayer.player.unMute();
						YTPlayer.isMute = false;
						YTPlayer.player.setVolume( YTPlayer.opt.vol );
						if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10 );
						var controls = $( "#controlBar_" + YTPlayer.id );
						var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
						muteBtn.html( $.mbYTPlayer.controls.mute );
						$( YTPlayer ).removeClass( "isMuted" );
						if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.removeClass( "muted" );
						var YTPEvent = $.Event( "YTPUnmuted" );
						YTPEvent.time = YTPlayer.player.time;
						if( YTPlayer.canTrigger ) $( YTPlayer ).trigger( YTPEvent );
						return this;
				},
				/**
				 *
				 * @param filter
				 * @param value
				 * @returns {$.mbYTPlayer}
				 */
				applyFilter: function( filter, value ) {
						var YTPlayer = this.get( 0 );
						YTPlayer.filters[ filter ].value = value;
						if( YTPlayer.filtersEnabled ) this.YTPEnableFilters();
						return this;
				},
				/**
				 *
				 * @param filters
				 * @returns {$.mbYTPlayer}
				 */
				applyFilters: function( filters ) {
						var YTPlayer = this.get( 0 );
						this.on( "YTPReady", function() {
								for( var key in filters ) {
										YTPlayer.filters[ key ].value = filters[ key ];
										$( YTPlayer ).YTPApplyFilter( key, filters[ key ] );
								}
								$( YTPlayer ).trigger( "YTPFiltersApplied" );
						} );
						return this;
				},
				/**
				 *
				 * @param filter
				 * @param value
				 * @returns {*}
				 */
				toggleFilter: function( filter, value ) {
						return this.each( function() {
								var YTPlayer = this;
								if( !YTPlayer.filters[ filter ].value ) YTPlayer.filters[ filter ].value = value;
								else YTPlayer.filters[ filter ].value = 0;
								if( YTPlayer.filtersEnabled ) $( this ).YTPEnableFilters();
						} )
						return this;
				},
				/**
				 *
				 * @param callback
				 * @returns {*}
				 */
				toggleFilters: function( callback ) {
						return this.each( function() {
								var YTPlayer = this;
								if( YTPlayer.filtersEnabled ) {
										$( YTPlayer ).trigger( "YTPDisableFilters" );
										$( YTPlayer ).YTPDisableFilters();
								} else {
										$( YTPlayer ).YTPEnableFilters();
										$( YTPlayer ).trigger( "YTPEnableFilters" );
								}
								if( typeof callback == "function" ) callback( YTPlayer.filtersEnabled );
						} )
				},
				/**
				 *
				 * @returns {*}
				 */
				disableFilters: function() {
						return this.each( function() {
								var YTPlayer = this;
								var iframe = $( YTPlayer.playerEl );
								iframe.css( "-webkit-filter", "" );
								iframe.css( "filter", "" );
								YTPlayer.filtersEnabled = false;
						} )
				},
				/**
				 *
				 * @returns {*}
				 */
				enableFilters: function() {
						return this.each( function() {
								var YTPlayer = this;
								var iframe = $( YTPlayer.playerEl );
								var filterStyle = "";
								for( var key in YTPlayer.filters ) {
										if( YTPlayer.filters[ key ].value ) filterStyle += key.replace( "_", "-" ) + "(" + YTPlayer.filters[ key ].value + YTPlayer.filters[ key ].unit + ") ";
								}
								iframe.css( "-webkit-filter", filterStyle );
								iframe.css( "filter", filterStyle );
								YTPlayer.filtersEnabled = true;
						} )
						return this;
				},
				/**
				 *
				 * @param filter
				 * @param callback
				 * @returns {*}
				 */
				removeFilter: function( filter, callback ) {
						return this.each( function() {
								if( typeof filter == "function" ) {
										callback = filter;
										filter = null;
								}
								var YTPlayer = this;
								if( !filter )
										for( var key in YTPlayer.filters ) {
												$( this ).YTPApplyFilter( key, 0 );
												if( typeof callback == "function" ) callback( key );
										} else {
												$( this ).YTPApplyFilter( filter, 0 );
												if( typeof callback == "function" ) callback( filter );
										}
						} );
						return this;
				},
				/**
				 *
				 * @returns {{totalTime: number, currentTime: number}}
				 */
				manageProgress: function() {
						var YTPlayer = this.get( 0 );
						var controls = $( "#controlBar_" + YTPlayer.id );
						var progressBar = controls.find( ".mb_YTPProgress" );
						var loadedBar = controls.find( ".mb_YTPLoaded" );
						var timeBar = controls.find( ".mb_YTPseekbar" );
						var totW = progressBar.outerWidth();
						var currentTime = Math.floor( YTPlayer.player.getCurrentTime() );
						var totalTime = Math.floor( YTPlayer.player.getDuration() );
						var timeW = ( currentTime * totW ) / totalTime;
						var startLeft = 0;
						var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;
						loadedBar.css( {
								left: startLeft,
								width: loadedW + "%"
						} );
						timeBar.css( {
								left: 0,
								width: timeW
						} );
						return {
								totalTime: totalTime,
								currentTime: currentTime
						};
				},
				/**
				 *
				 * @param YTPlayer
				 */
				buildControls: function( YTPlayer ) {
						var data = YTPlayer.opt;
						// @data.printUrl: is deprecated; use data.showYTLogo
						data.showYTLogo = data.showYTLogo || data.printUrl;
						if( $( "#controlBar_" + YTPlayer.id ).length ) return;
						YTPlayer.controlBar = $( "<span/>" ).attr( "id", "controlBar_" + YTPlayer.id ).addClass( "mb_YTPBar" ).css( {
								whiteSpace: "noWrap",
								position: YTPlayer.isBackground ? "fixed" : "absolute",
								zIndex: YTPlayer.isBackground ? 10000 : 1000
						} ).hide();
						var buttonBar = $( "<div/>" ).addClass( "buttonBar" );
						/* play/pause button*/
						var playpause = $( "<span>" + $.mbYTPlayer.controls.play + "</span>" ).addClass( "mb_YTPPlaypause ytpicon" ).click( function() {
								if( YTPlayer.player.getPlayerState() == 1 ) $( YTPlayer ).YTPPause();
								else $( YTPlayer ).YTPPlay();
						} );
						/* mute/unmute button*/
						var MuteUnmute = $( "<span>" + $.mbYTPlayer.controls.mute + "</span>" ).addClass( "mb_YTPMuteUnmute ytpicon" ).click( function() {
								if( YTPlayer.player.getVolume() == 0 ) {
										$( YTPlayer ).YTPUnmute();
								} else {
										$( YTPlayer ).YTPMute();
								}
						} );
						/* volume bar*/
						var volumeBar = $( "<div/>" ).addClass( "mb_YTPVolumeBar" ).css( {
								display: "inline-block"
						} );
						YTPlayer.volumeBar = volumeBar;
						/* time elapsed */
						var idx = $( "<span/>" ).addClass( "mb_YTPTime" );
						var vURL = data.videoURL ? data.videoURL : "";
						if( vURL.indexOf( "http" ) < 0 ) vURL = $.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL;
						var movieUrl = $( "<span/>" ).html( $.mbYTPlayer.controls.ytLogo ).addClass( "mb_YTPUrl ytpicon" ).attr( "title", "view on YouTube" ).on( "click", function() {
								window.open( vURL, "viewOnYT" )
						} );
						var onlyVideo = $( "<span/>" ).html( $.mbYTPlayer.controls.onlyYT ).addClass( "mb_OnlyYT ytpicon" ).on( "click", function() {
								$( YTPlayer ).YTPFullscreen( data.realfullscreen );
						} );
						var progressBar = $( "<div/>" ).addClass( "mb_YTPProgress" ).css( "position", "absolute" ).click( function( e ) {
								timeBar.css( {
										width: ( e.clientX - timeBar.offset().left )
								} );
								YTPlayer.timeW = e.clientX - timeBar.offset().left;
								YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
										width: 0
								} );
								var totalTime = Math.floor( YTPlayer.player.getDuration() );
								YTPlayer.goto = ( timeBar.outerWidth() * totalTime ) / progressBar.outerWidth();
								YTPlayer.player.seekTo( parseFloat( YTPlayer.goto ), true );
								YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
										width: 0
								} );
						} );
						var loadedBar = $( "<div/>" ).addClass( "mb_YTPLoaded" ).css( "position", "absolute" );
						var timeBar = $( "<div/>" ).addClass( "mb_YTPseekbar" ).css( "position", "absolute" );
						progressBar.append( loadedBar ).append( timeBar );
						buttonBar.append( playpause ).append( MuteUnmute ).append( volumeBar ).append( idx );
						if( data.showYTLogo ) {
								buttonBar.append( movieUrl );
						}
						if( YTPlayer.isBackground || ( eval( YTPlayer.opt.realfullscreen ) && !YTPlayer.isBackground ) ) buttonBar.append( onlyVideo );
						YTPlayer.controlBar.append( buttonBar ).append( progressBar );
						if( !YTPlayer.isBackground ) {
								YTPlayer.controlBar.addClass( "inlinePlayer" );
								YTPlayer.wrapper.before( YTPlayer.controlBar );
						} else {
								$( "body" ).after( YTPlayer.controlBar );
						}
						volumeBar.simpleSlider( {
								initialval: YTPlayer.opt.vol,
								scale: 100,
								orientation: "h",
								callback: function( el ) {
										if( el.value == 0 ) {
												$( YTPlayer ).YTPMute();
										} else {
												$( YTPlayer ).YTPUnmute();
										}
										YTPlayer.player.setVolume( el.value );
										if( !YTPlayer.isMute ) YTPlayer.opt.vol = el.value;
								}
						} );
				},
				/**
				 *
				 *
				 * */
				checkForState: function( YTPlayer ) {
						var interval = YTPlayer.opt.showControls ? 100 : 700;
						clearInterval( YTPlayer.getState );
						//Checking if player has been removed from scene
						if( !$.contains( document, YTPlayer ) ) {
								$( YTPlayer ).YTPPlayerDestroy();
								clearInterval( YTPlayer.getState );
								clearInterval( YTPlayer.checkForStartAt );
								return;
						}
						$.mbYTPlayer.checkForStart( YTPlayer );
						YTPlayer.getState = setInterval( function() {
								var prog = $( YTPlayer ).YTPManageProgress();
								var $YTPlayer = $( YTPlayer );
								var data = YTPlayer.opt;
								var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 0;
								var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
								stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0;
								if( YTPlayer.player.time != prog.currentTime ) {
										var YTPEvent = $.Event( "YTPTime" );
										YTPEvent.time = YTPlayer.player.time;
										$( YTPlayer ).trigger( YTPEvent );
								}
								YTPlayer.player.time = prog.currentTime;
								if( YTPlayer.player.getVolume() == 0 ) $YTPlayer.addClass( "isMuted" );
								else $YTPlayer.removeClass( "isMuted" );
								if( YTPlayer.opt.showControls )
										if( prog.totalTime ) {
												YTPlayer.controlBar.find( ".mb_YTPTime" ).html( $.mbYTPlayer.formatTime( prog.currentTime ) + " / " + $.mbYTPlayer.formatTime( prog.totalTime ) );
										} else {
												YTPlayer.controlBar.find( ".mb_YTPTime" ).html( "-- : -- / -- : --" );
										}
								if( eval( YTPlayer.opt.stopMovieOnBlur ) )
										if( !document.hasFocus() ) {
												if( YTPlayer.state == 1 ) {
														YTPlayer.hasFocus = false;
														$YTPlayer.YTPPause();
												}
										} else if( document.hasFocus() && !YTPlayer.hasFocus && !( YTPlayer.state == -1 || YTPlayer.state == 0 ) ) {
										YTPlayer.hasFocus = true;
										$YTPlayer.YTPPlay();
								}
								if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ) {
										YTPlayer.controlBar.addClass( "compact" );
										YTPlayer.isCompact = true;
										if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
								} else if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact ) {
										YTPlayer.controlBar.removeClass( "compact" );
										YTPlayer.isCompact = false;
										if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
								}
								if( YTPlayer.player.getPlayerState() == 1 && ( parseFloat( YTPlayer.player.getDuration() - 1.5 ) < YTPlayer.player.getCurrentTime() || ( stopAt > 0 && parseFloat( YTPlayer.player.getCurrentTime() ) > stopAt ) ) ) {
										if( YTPlayer.isEnded ) return;
										YTPlayer.isEnded = true;
										setTimeout( function() {
												YTPlayer.isEnded = false
										}, 1000 );
										if( YTPlayer.isPlayList ) {
												clearInterval( YTPlayer.getState );
												var YTPEnd = $.Event( "YTPEnd" );
												YTPEnd.time = YTPlayer.player.time;
												$( YTPlayer ).trigger( YTPEnd );
												return;
										} else if( !data.loop ) {
												YTPlayer.player.pauseVideo();
												YTPlayer.wrapper.CSSAnimate( {
														opacity: 0
												}, 1000, function() {
														var YTPEnd = $.Event( "YTPEnd" );
														YTPEnd.time = YTPlayer.player.time;
														$( YTPlayer ).trigger( YTPEnd );
														YTPlayer.player.seekTo( startAt, true );
														if( !YTPlayer.isBackground ) {
																YTPlayer.opt.containment.css( {
																		background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
																		backgroundSize: "cover"
																} );
														}
												} );
										} else {

												startAt = startAt || 1;

												YTPlayer.player.pauseVideo();
												YTPlayer.player.seekTo( startAt, true );
												$YTPlayer.YTPPlay();

										}
								}
						}, interval );
				},
				/**
				 *
				 * */
				checkForStart: function( YTPlayer ) {
						var $YTPlayer = $( YTPlayer );
						//Checking if player has been removed from scene
						if( !$.contains( document, YTPlayer ) ) {
								$( YTPlayer ).YTPPlayerDestroy();
								return
						}
						if( $.browser.chrome ) YTPlayer.opt.quality = "default";
						YTPlayer.player.pauseVideo();
						$( YTPlayer ).muteYTPVolume();
						$( "#controlBar_" + YTPlayer.id ).remove();
						if( YTPlayer.opt.showControls ) $.mbYTPlayer.buildControls( YTPlayer );
						if( YTPlayer.opt.addRaster ) {
								var classN = YTPlayer.opt.addRaster == "dot" ? "raster-dot" : "raster";
								YTPlayer.overlay.addClass( YTPlayer.isRetina ? classN + " retina" : classN );
						} else {
								YTPlayer.overlay.removeClass( function( index, classNames ) {
										// change the list into an array
										var current_classes = classNames.split( " " ),
												// array of classes which are to be removed
												classes_to_remove = [];
										$.each( current_classes, function( index, class_name ) {
												// if the classname begins with bg add it to the classes_to_remove array
												if( /raster.*/.test( class_name ) ) {
														classes_to_remove.push( class_name );
												}
										} );
										classes_to_remove.push( "retina" );
										// turn the array back into a string
										return classes_to_remove.join( " " );
								} )
						}
						YTPlayer.checkForStartAt = setInterval( function() {
								$( YTPlayer ).YTPMute();
								var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
								var canPlayVideo = ( YTPlayer.player.getVideoLoadedFraction() > startAt / YTPlayer.player.getDuration() );
								if( YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo ) {
										clearInterval( YTPlayer.checkForStartAt );
										YTPlayer.isReady = true;
										if( typeof YTPlayer.opt.onReady == "function" ) YTPlayer.opt.onReady( YTPlayer );
										var YTPready = $.Event( "YTPReady" );
										$( YTPlayer ).trigger( YTPready );
										YTPlayer.player.pauseVideo();
										if( !YTPlayer.opt.mute ) $( YTPlayer ).YTPUnmute();
										YTPlayer.canTrigger = true;
										if( YTPlayer.opt.autoPlay ) {
												$YTPlayer.YTPPlay();
												$YTPlayer.css( "background-image", "none" );
												$( YTPlayer.playerEl ).CSSAnimate( {
														opacity: 1
												}, 1000 );
												YTPlayer.wrapper.CSSAnimate( {
														opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
												}, 1000 );
										} else {
												YTPlayer.player.pauseVideo();
												if( !YTPlayer.isPlayer ) {
														$( YTPlayer.playerEl ).CSSAnimate( {
																opacity: 1
														}, 1000 );
														YTPlayer.wrapper.CSSAnimate( {
																opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
														}, 1000 );
												}
										}
										if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
												YTPlayer.loading.html( "Ready" );
												setTimeout( function() {
														YTPlayer.loading.fadeOut();


												}, 100 )
										}
										if( YTPlayer.controlBar ) YTPlayer.controlBar.slideDown( 1000 );
								} else {
										//YTPlayer.player.playVideo();
										if( startAt >= 0 ) YTPlayer.player.seekTo( startAt, true );
								}
						}, 1000 );
				},
				/**
				 *
				 * @param s
				 * @returns {string}
				 */
				formatTime: function( s ) {
						var min = Math.floor( s / 60 );
						var sec = Math.floor( s - ( 60 * min ) );
						return( min <= 9 ? "0" + min : min ) + " : " + ( sec <= 9 ? "0" + sec : sec );
				}
		};
		/**
		 *
		 * @returns {boolean}
		 */
		$.fn.toggleVolume = function() {
				var YTPlayer = this.get( 0 );
				if( !YTPlayer ) return;
				if( YTPlayer.player.isMuted() ) {
						$( YTPlayer ).YTPUnmute();
						return true;
				} else {
						$( YTPlayer ).YTPMute();
						return false;
				}
		};
		/**
		 *
		 */
		$.fn.optimizeDisplay = function() {
				var YTPlayer = this.get( 0 );
				var data = YTPlayer.opt;
				var playerBox = $( YTPlayer.playerEl );
				var win = {};
				var el = YTPlayer.wrapper;
				win.width = el.outerWidth();
				win.height = el.outerHeight();
				var margin = 24;
				var overprint = 100;
				var vid = {};
				if( data.optimizeDisplay ) {
						vid.width = win.width + ( ( win.width * margin ) / 100 );
						vid.height = data.ratio == "16/9" ? Math.ceil( ( 9 * win.width ) / 16 ) : Math.ceil( ( 3 * win.width ) / 4 );
						vid.marginTop = -( ( vid.height - win.height ) / 2 );
						vid.marginLeft = -( ( win.width * ( margin / 2 ) ) / 100 );
						if( vid.height < win.height ) {
								vid.height = win.height + ( ( win.height * margin ) / 100 );
								vid.width = data.ratio == "16/9" ? Math.floor( ( 16 * win.height ) / 9 ) : Math.floor( ( 4 * win.height ) / 3 );
								vid.marginTop = -( ( win.height * ( margin / 2 ) ) / 100 );
								vid.marginLeft = -( ( vid.width - win.width ) / 2 );
						}
						vid.width += overprint;
						vid.height += overprint;
						vid.marginTop -= overprint / 2;
						vid.marginLeft -= overprint / 2;
				} else {
						vid.width = "100%";
						vid.height = "100%";
						vid.marginTop = 0;
						vid.marginLeft = 0;
				}
				playerBox.css( {
						width: vid.width,
						height: vid.height,
						marginTop: vid.marginTop,
						marginLeft: vid.marginLeft
				} );
		};
		/**
		 *
		 * @param arr
		 * @returns {Array|string|Blob|*}
		 *
		 */
		$.shuffle = function( arr ) {
				var newArray = arr.slice();
				var len = newArray.length;
				var i = len;
				while( i-- ) {
						var p = parseInt( Math.random() * len );
						var t = newArray[ i ];
						newArray[ i ] = newArray[ p ];
						newArray[ p ] = t;
				}
				return newArray;
		};

		/* Exposed public method */
		$.fn.YTPlayer = $.mbYTPlayer.buildPlayer;
		$.fn.YTPGetPlayer = $.mbYTPlayer.getPlayer;
		$.fn.YTPGetVideoID = $.mbYTPlayer.getVideoID;
		$.fn.YTPChangeMovie = $.mbYTPlayer.changeMovie;
		$.fn.YTPPlayerDestroy = $.mbYTPlayer.playerDestroy;

		$.fn.YTPPlay = $.mbYTPlayer.play;
		$.fn.YTPTogglePlay = $.mbYTPlayer.togglePlay;
		$.fn.YTPStop = $.mbYTPlayer.stop;
		$.fn.YTPPause = $.mbYTPlayer.pause;
		$.fn.YTPSeekTo = $.mbYTPlayer.seekTo;

		$.fn.YTPlaylist = $.mbYTPlayer.playlist;
		$.fn.YTPPlayNext = $.mbYTPlayer.playNext;
		$.fn.YTPPlayPrev = $.mbYTPlayer.playPrev;

		$.fn.YTPMute = $.mbYTPlayer.mute;
		$.fn.YTPUnmute = $.mbYTPlayer.unmute;
		$.fn.YTPToggleVolume = $.mbYTPlayer.toggleVolume;
		$.fn.YTPSetVolume = $.mbYTPlayer.setVolume;

		$.fn.YTPGetVideoData = $.mbYTPlayer.getVideoData;
		$.fn.YTPFullscreen = $.mbYTPlayer.fullscreen;
		$.fn.YTPToggleLoops = $.mbYTPlayer.toggleLoops;
		$.fn.YTPSetVideoQuality = $.mbYTPlayer.setVideoQuality;
		$.fn.YTPManageProgress = $.mbYTPlayer.manageProgress;

		$.fn.YTPApplyFilter = $.mbYTPlayer.applyFilter;
		$.fn.YTPApplyFilters = $.mbYTPlayer.applyFilters;
		$.fn.YTPToggleFilter = $.mbYTPlayer.toggleFilter;
		$.fn.YTPToggleFilters = $.mbYTPlayer.toggleFilters;
		$.fn.YTPRemoveFilter = $.mbYTPlayer.removeFilter;
		$.fn.YTPDisableFilters = $.mbYTPlayer.disableFilters;
		$.fn.YTPEnableFilters = $.mbYTPlayer.enableFilters;


		/**
		 *
		 * @deprecated
		 *
		 **/
		$.fn.mb_YTPlayer = $.mbYTPlayer.buildPlayer;
		$.fn.playNext = $.mbYTPlayer.playNext;
		$.fn.playPrev = $.mbYTPlayer.playPrev;
		$.fn.changeMovie = $.mbYTPlayer.changeMovie;
		$.fn.getVideoID = $.mbYTPlayer.getVideoID;
		$.fn.getPlayer = $.mbYTPlayer.getPlayer;
		$.fn.playerDestroy = $.mbYTPlayer.playerDestroy;
		$.fn.fullscreen = $.mbYTPlayer.fullscreen;
		$.fn.buildYTPControls = $.mbYTPlayer.buildControls;
		$.fn.playYTP = $.mbYTPlayer.play;
		$.fn.toggleLoops = $.mbYTPlayer.toggleLoops;
		$.fn.stopYTP = $.mbYTPlayer.stop;
		$.fn.pauseYTP = $.mbYTPlayer.pause;
		$.fn.seekToYTP = $.mbYTPlayer.seekTo;
		$.fn.muteYTPVolume = $.mbYTPlayer.mute;
		$.fn.unmuteYTPVolume = $.mbYTPlayer.unmute;
		$.fn.setYTPVolume = $.mbYTPlayer.setVolume;
		$.fn.setVideoQuality = $.mbYTPlayer.setVideoQuality;
		$.fn.manageYTPProgress = $.mbYTPlayer.manageProgress;
		$.fn.YTPGetDataFromFeed = $.mbYTPlayer.getVideoData;


} )( $, ytp );
;
/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.40
 *  *****************************************************************************
 */

function uncamel(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function setUnit(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$/)?""+a+b:a}function setFilter(a,b,c){var d=uncamel(b),e=$.browser.mozilla?"":$.CSS.sfx;a[e+"filter"]=a[e+"filter"]||"",c=setUnit(c>$.CSS.filters[b].max?$.CSS.filters[b].max:c,$.CSS.filters[b].unit),a[e+"filter"]+=d+"("+c+") ",delete a[b]}$.support.CSStransition=function(){var a=document.body||document.documentElement,b=a.style;return void 0!==b.transition||void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.MsTransition||void 0!==b.OTransition}(),$.CSS={name:"mb.CSSAnimate",author:"Matteo Bicocchi",version:"2.0.0",transitionEnd:"transitionEnd",sfx:"",filters:{blur:{min:0,max:100,unit:"px"},brightness:{min:0,max:400,unit:"%"},contrast:{min:0,max:400,unit:"%"},grayscale:{min:0,max:100,unit:"%"},hueRotate:{min:0,max:360,unit:"deg"},invert:{min:0,max:100,unit:"%"},saturate:{min:0,max:400,unit:"%"},sepia:{min:0,max:100,unit:"%"}},normalizeCss:function(a){var b=$.extend(!0,{},a);$.browser.webkit||$.browser.opera?$.CSS.sfx="-webkit-":$.browser.mozilla?$.CSS.sfx="-moz-":$.browser.msie&&($.CSS.sfx="-ms-");for(var c in b){"transform"===c&&(b[$.CSS.sfx+"transform"]=b[c],delete b[c]),"transform-origin"===c&&(b[$.CSS.sfx+"transform-origin"]=a[c],delete b[c]),"filter"!==c||$.browser.mozilla||(b[$.CSS.sfx+"filter"]=a[c],delete b[c]),"blur"===c&&setFilter(b,"blur",a[c]),"brightness"===c&&setFilter(b,"brightness",a[c]),"contrast"===c&&setFilter(b,"contrast",a[c]),"grayscale"===c&&setFilter(b,"grayscale",a[c]),"hueRotate"===c&&setFilter(b,"hueRotate",a[c]),"invert"===c&&setFilter(b,"invert",a[c]),"saturate"===c&&setFilter(b,"saturate",a[c]),"sepia"===c&&setFilter(b,"sepia",a[c]);var d="";"x"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateX("+setUnit(a[c],"px")+")",delete b[c]),"y"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateY("+setUnit(a[c],"px")+")",delete b[c]),"z"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateZ("+setUnit(a[c],"px")+")",delete b[c]),"rotate"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotate("+setUnit(a[c],"deg")+")",delete b[c]),"rotateX"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateX("+setUnit(a[c],"deg")+")",delete b[c]),"rotateY"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateY("+setUnit(a[c],"deg")+")",delete b[c]),"rotateZ"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateZ("+setUnit(a[c],"deg")+")",delete b[c]),"scale"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scale("+setUnit(a[c],"")+")",delete b[c]),"scaleX"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleX("+setUnit(a[c],"")+")",delete b[c]),"scaleY"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleY("+setUnit(a[c],"")+")",delete b[c]),"scaleZ"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleZ("+setUnit(a[c],"")+")",delete b[c]),"skew"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skew("+setUnit(a[c],"deg")+")",delete b[c]),"skewX"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewX("+setUnit(a[c],"deg")+")",delete b[c]),"skewY"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewY("+setUnit(a[c],"deg")+")",delete b[c]),"perspective"===c&&(d=$.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" perspective("+setUnit(a[c],"px")+")",delete b[c])}return b},getProp:function(a){var b=[];for(var c in a)b.indexOf(c)<0&&b.push(uncamel(c));return b.join(",")},animate:function(a,b,c,d,e){return this.each(function(){function o(){f.called=!0,f.CSSAIsRunning=!1,g.off($.CSS.transitionEnd+"."+f.id),clearTimeout(f.timeout),g.css($.CSS.sfx+"transition",""),"function"==typeof e&&e.apply(f),"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null)}var f=this,g=$(this);f.id=f.id||"CSSA_"+(new Date).getTime();var h=h||{type:"noEvent"};if(f.CSSAIsRunning&&f.eventType==h.type&&!$.browser.msie&&$.browser.version<=9)return f.CSSqueue=function(){g.CSSAnimate(a,b,c,d,e)},void 0;if(f.CSSqueue=null,f.eventType=h.type,0!==g.length&&a){if(a=$.normalizeCss(a),f.CSSAIsRunning=!0,"function"==typeof b&&(e=b,b=$.fx.speeds._default),"function"==typeof c&&(d=c,c=0),"string"==typeof c&&(e=c,c=0),"function"==typeof d&&(e=d,d="cubic-bezier(0.65,0.03,0.36,0.72)"),"string"==typeof b)for(var i in $.fx.speeds){if(b==i){b=$.fx.speeds[i];break}b=$.fx.speeds._default}if(b||(b=$.fx.speeds._default),"string"==typeof e&&(d=e,e=null),!$.support.CSStransition){for(var j in a){if("transform"===j&&delete a[j],"filter"===j&&delete a[j],"transform-origin"===j&&delete a[j],"auto"===a[j]&&delete a[j],"x"===j){var k=a[j],l="left";a[l]=k,delete a[j]}if("y"===j){var k=a[j],l="top";a[l]=k,delete a[j]}("-ms-transform"===j||"-ms-filter"===j)&&delete a[j]}return g.delay(c).animate(a,b,e),void 0}var m={"default":"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};m[d]&&(d=m[d]),g.off($.CSS.transitionEnd+"."+f.id);var n=$.CSS.getProp(a),p={};$.extend(p,a),p[$.CSS.sfx+"transition-property"]=n,p[$.CSS.sfx+"transition-duration"]=b+"ms",p[$.CSS.sfx+"transition-delay"]=c+"ms",p[$.CSS.sfx+"transition-timing-function"]=d,setTimeout(function(){g.one($.CSS.transitionEnd+"."+f.id,o),g.css(p)},1),f.timeout=setTimeout(function(){return f.called||!e?(f.called=!1,f.CSSAIsRunning=!1,void 0):(g.css($.CSS.sfx+"transition",""),e.apply(f),f.CSSAIsRunning=!1,"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null),void 0)},b+c+10)}})}},$.fn.CSSAnimate=$.CSS.animate,$.normalizeCss=$.CSS.normalizeCss,$.fn.css3=function(a){return this.each(function(){var b=$(this),c=$.normalizeCss(a);b.css(c)})};
;/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.browser.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.43
 *  *****************************************************************************
 */

var nAgt=navigator.userAgent;if(!$.browser){$.browser={},$.browser.mozilla=!1,$.browser.webkit=!1,$.browser.opera=!1,$.browser.safari=!1,$.browser.chrome=!1,$.browser.msie=!1,$.browser.ua=nAgt,$.browser.name=navigator.appName,$.browser.fullVersion=""+parseFloat(navigator.appVersion),$.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;if(-1!=(verOffset=nAgt.indexOf("Opera")))$.browser.opera=!0,$.browser.name="Opera",$.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&($.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))$.browser.opera=!0,$.browser.name="Opera",$.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))$.browser.msie=!0,$.browser.name="Microsoft Internet Explorer",$.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){$.browser.msie=!0,$.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;$.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Chrome"))?($.browser.webkit=!0,$.browser.chrome=!0,$.browser.name="Chrome",$.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?($.browser.webkit=!0,$.browser.safari=!0,$.browser.name="Safari",$.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&($.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?($.browser.webkit=!0,$.browser.name="Safari",$.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&($.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?($.browser.mozilla=!0,$.browser.name="Firefox",$.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&($.browser.name=nAgt.substring(nameOffset,verOffset),$.browser.fullVersion=nAgt.substring(verOffset+1),$.browser.name.toLowerCase()==$.browser.name.toUpperCase()&&($.browser.name=navigator.appName));-1!=(ix=$.browser.fullVersion.indexOf(";"))&&($.browser.fullVersion=$.browser.fullVersion.substring(0,ix)),-1!=(ix=$.browser.fullVersion.indexOf(" "))&&($.browser.fullVersion=$.browser.fullVersion.substring(0,ix)),$.browser.majorVersion=parseInt(""+$.browser.fullVersion,10),isNaN($.browser.majorVersion)&&($.browser.fullVersion=""+parseFloat(navigator.appVersion),$.browser.majorVersion=parseInt(navigator.appVersion,10)),$.browser.version=$.browser.majorVersion}$.browser.android=/Android/i.test(nAgt),$.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt),$.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt),$.browser.operaMobile=/Opera Mini/i.test(nAgt),$.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt),$.browser.kindle=/Kindle|Silk/i.test(nAgt),$.browser.mobile=$.browser.android||$.browser.blackberry||$.browser.ios||$.browser.windowsMobile||$.browser.operaMobile||$.browser.kindle,$.isMobile=$.browser.mobile,$.isTablet=$.browser.mobile&&$(window).width()>765,$.isAndroidDefault=$.browser.android&&!/chrome/i.test(nAgt);
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
 _ last modified: 16/05/15 23.45                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

!function(a){/iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());var c="ontouchstart"in window||window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture||window.DocumentTouch&&document instanceof DocumentTouch||!1;a.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:c?"touchstart":"mousedown",end:c?"touchend":"mouseup",move:c?"touchmove":"mousemove"},init:function(b){return this.each(function(){var d=this,e=a(d);e.addClass("simpleSlider"),d.opt={},a.extend(d.opt,a.simpleSlider.defaults,b),a.extend(d.opt,e.data());var f="h"==d.opt.orientation?"horizontal":"vertical",g=a("<div/>").addClass("level").addClass(f);e.prepend(g),d.level=g,e.css({cursor:"default"}),"auto"==d.opt.scale&&(d.opt.scale=a(d).outerWidth()),e.updateSliderVal(),d.opt.readonly||(e.on(a.simpleSlider.events.start,function(a){c&&(a=a.changedTouches[0]),d.canSlide=!0,e.updateSliderVal(a),e.css({cursor:"col-resize"}),a.preventDefault(),a.stopPropagation()}),a(document).on(a.simpleSlider.events.move,function(b){c&&(b=b.changedTouches[0]),d.canSlide&&(a(document).css({cursor:"default"}),e.updateSliderVal(b),b.preventDefault(),b.stopPropagation())}).on(a.simpleSlider.events.end,function(){a(document).css({cursor:"auto"}),d.canSlide=!1,e.css({cursor:"auto"})}))})},updateSliderVal:function(b){function g(a,b){return Math.floor(100*a/b)}var c=this,d=c.get(0);d.opt.initialval="number"==typeof d.opt.initialval?d.opt.initialval:d.opt.initialval(d);var e=a(d).outerWidth(),f=a(d).outerHeight();d.x="object"==typeof b?b.clientX+document.body.scrollLeft-c.offset().left:"number"==typeof b?b*e/d.opt.scale:d.opt.initialval*e/d.opt.scale,d.y="object"==typeof b?b.clientY+document.body.scrollTop-c.offset().top:"number"==typeof b?(d.opt.scale-d.opt.initialval-b)*f/d.opt.scale:d.opt.initialval*f/d.opt.scale,d.y=c.outerHeight()-d.y,d.scaleX=d.x*d.opt.scale/e,d.scaleY=d.y*d.opt.scale/f,d.outOfRangeX=d.scaleX>d.opt.scale?d.scaleX-d.opt.scale:d.scaleX<0?d.scaleX:0,d.outOfRangeY=d.scaleY>d.opt.scale?d.scaleY-d.opt.scale:d.scaleY<0?d.scaleY:0,d.outOfRange="h"==d.opt.orientation?d.outOfRangeX:d.outOfRangeY,d.value="undefined"!=typeof b?"h"==d.opt.orientation?d.x>=c.outerWidth()?d.opt.scale:d.x<=0?0:d.scaleX:d.y>=c.outerHeight()?d.opt.scale:d.y<=0?0:d.scaleY:"h"==d.opt.orientation?d.scaleX:d.scaleY,"h"==d.opt.orientation?d.level.width(g(d.x,e)+"%"):d.level.height(g(d.y,f)),"function"==typeof d.opt.callback&&d.opt.callback(d)}},a.fn.simpleSlider=a.simpleSlider.init,a.fn.updateSliderVal=a.simpleSlider.updateSliderVal}($);
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.storage.min.js                                                                                                                   _
 _ last modified: 24/05/15 16.08                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

!function(a){a.mbCookie={set:function(a,b,c,d){b=JSON.stringify(b),c||(c=7),d=d?"; domain="+d:"";var f,e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),f="; expires="+e.toGMTString(),document.cookie=a+"="+b+f+"; path=/"+d},get:function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(b))return JSON.parse(e.substring(b.length,e.length))}return null},remove:function(b){a.mbCookie.set(b,"",-1)}},a.mbStorage={set:function(a,b){b=JSON.stringify(b),localStorage.setItem(a,b)},get:function(a){return localStorage[a]?JSON.parse(localStorage[a]):null},remove:function(a){a?localStorage.removeItem(a):localStorage.clear()}}}($);
