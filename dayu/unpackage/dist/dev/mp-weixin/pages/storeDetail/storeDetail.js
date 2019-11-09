(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/storeDetail/storeDetail"],{

/***/ 130:
/*!******************************************************************************!*\
  !*** F:/code/dayu/dayu/main.js?{"page":"pages%2FstoreDetail%2FstoreDetail"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ 1);
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ 23));
var _storeDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/storeDetail/storeDetail.vue */ 131));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_storeDetail.default));

/***/ }),

/***/ 131:
/*!***********************************************************!*\
  !*** F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storeDetail.vue?vue&type=template&id=3e803bf6&scoped=true& */ 132);
/* harmony import */ var _storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storeDetail.vue?vue&type=script&lang=js& */ 135);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storeDetail.vue?vue&type=style&index=0&id=3e803bf6&scoped=true&lang=scss& */ 137);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 10);






/* normalize component */

var component = Object(_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3e803bf6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "code/dayu/dayu/pages/storeDetail/storeDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 132:
/*!******************************************************************************************************!*\
  !*** F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=template&id=3e803bf6&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storeDetail.vue?vue&type=template&id=3e803bf6&scoped=true& */ 133);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_template_id_3e803bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 133:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=template&id=3e803bf6&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: "storeDetail" },
    [
      _vm.isShowSkeleton
        ? _c("skeleton", { attrs: { mpcomid: "ed7a5576-0" } })
        : _vm._e(),
      _c(
        "cu-custom",
        {
          attrs: {
            bgColor: "white",
            isBack: !_vm.isSharePage,
            mpcomid: "ed7a5576-1"
          }
        },
        [_c("block", { slot: "content" }, [_vm._v("商品详情")])],
        1
      ),
      _c(
        "view",
        { staticClass: "contentBox" },
        [
          _c(
            "scroll-view",
            {
              staticClass: "scrollBox",
              attrs: { "scroll-y": !_vm.isShowSkeleton }
            },
            [
              _vm.isShowSkeleton
                ? _c("view", { staticClass: "storeBanner skeleton-rect" })
                : _vm._e(),
              _vm.detailObj.goods_type == 0
                ? _c(
                    "view",
                    { staticClass: "storeBanner" },
                    [
                      _c(
                        "swiper",
                        {
                          staticClass: "storeSwiperBox",
                          attrs: {
                            "indicator-dots": true,
                            autoplay: true,
                            interval: 3000,
                            duration: 800
                          }
                        },
                        _vm._l(_vm.storeImgs, function(item, idx) {
                          return _c(
                            "block",
                            { key: idx },
                            [
                              _c(
                                "swiper-item",
                                { attrs: { mpcomid: "ed7a5576-2-" + idx } },
                                [
                                  _c(
                                    "view",
                                    {
                                      staticClass: "itemStoreBanner",
                                      attrs: { eventid: "ed7a5576-0-" + idx },
                                      on: {
                                        click: function($event) {
                                          _vm.toPriviewImg(idx)
                                        }
                                      }
                                    },
                                    [
                                      _c("image", {
                                        attrs: { src: item, mode: "aspectFill" }
                                      })
                                    ]
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        })
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm.detailObj.goods_type == 1
                ? _c("view", { staticClass: "showCouponBox" }, [
                    _c("view", { staticClass: "couponBoxBg" }, [
                      _c("img", {
                        attrs: {
                          src: __webpack_require__(/*! ../../static/coupon_bg.png */ 134),
                          alt: ""
                        }
                      })
                    ]),
                    _c("view", { staticClass: "couponBoxInfo" }, [
                      _c("view", { staticClass: "showCouponInfoBox" }, [
                        _c("view", { staticClass: "couponNamePrice" }, [
                          _c("view", { staticClass: "showCouponName" }, [
                            _vm._v(_vm._s(_vm.detailObj.goods_name))
                          ]),
                          _c("view", { staticClass: "showCouponPrice" }, [
                            _c("text", [
                              _vm._v(_vm._s(_vm.detailObj.goods_price))
                            ]),
                            _vm._v("元")
                          ])
                        ]),
                        _c("view", { staticClass: "showCouponNotice" }, [
                          _vm._v("仅限该商品，限柳叶湖使用")
                        ])
                      ])
                    ])
                  ])
                : _vm._e(),
              _c("view", { staticClass: "showTxtContent" }, [
                _c("view", { staticClass: "showStoreInfo" }, [
                  _c("view", { staticClass: "showStoreName" }, [
                    _c("text", { staticClass: "skeleton-rect" }, [
                      _vm._v(_vm._s(_vm.detailObj.goods_name))
                    ])
                  ]),
                  _c("view", { staticClass: "showStorePrice" }, [
                    _c(
                      "view",
                      { staticClass: "showCurStorePri skeleton-rect" },
                      [
                        _vm._v("￥"),
                        _c("text", [_vm._v(_vm._s(_vm.detailObj.goods_price))]),
                        _vm._v("元")
                      ]
                    ),
                    _vm.detailObj.cost_price
                      ? _c(
                          "view",
                          { staticClass: "showBefStorePri skeleton-rect" },
                          [
                            _vm._v(
                              "原价" + _vm._s(_vm.detailObj.cost_price) + "元"
                            )
                          ]
                        )
                      : _vm._e()
                  ]),
                  _vm.detailObj.goods_type == 0 && _vm.detailObj.goods_tips
                    ? _c(
                        "view",
                        { staticClass: "showStoreOtherInfo skeleton-rect" },
                        [_vm._v(_vm._s(_vm.detailObj.goods_tips))]
                      )
                    : _vm._e(),
                  _vm.detailObj.goods_type == 1
                    ? _c(
                        "view",
                        { staticClass: "showStoreOtherInfo skeleton-rect" },
                        [
                          _vm._v(
                            "有效期：" +
                              _vm._s(_vm.startTime) +
                              " 至 " +
                              _vm._s(_vm.endTime)
                          )
                        ]
                      )
                    : _vm._e()
                ]),
                _c("view", { staticClass: "showStoreDetail" }, [
                  _c("view", { staticClass: "showStoreTitle" }, [
                    _c("text", { staticClass: "skeleton-rect" }, [
                      _vm._v("商品详情")
                    ])
                  ]),
                  _c(
                    "view",
                    { staticClass: "showStoreDetailBox skeleton-rect" },
                    [_vm._v(_vm._s(_vm.detailObj.goods_desc))]
                  )
                ]),
                _c("view", { staticClass: "showStoreIntro" }, [
                  _c("view", { staticClass: "showStoreTitle" }, [
                    _c("text", { staticClass: "skeleton-rect" }, [
                      _vm._v("重要声明")
                    ])
                  ]),
                  _c(
                    "view",
                    { staticClass: "showStoreIntroBox skeleton-rect" },
                    [_vm._v(_vm._s(_vm.detailObj.important_explain))]
                  )
                ])
              ])
            ]
          )
        ],
        1
      ),
      _c(
        "view",
        { staticClass: "toBuyStoreBtn" },
        [
          _c(
            "view",
            {
              attrs: { eventid: "ed7a5576-1" },
              on: { click: _vm.bindToBuyStore }
            },
            [_vm._v("立即购买")]
          ),
          !_vm.isAuth
            ? _c(
                "button",
                {
                  staticClass: "toAuthBtn",
                  attrs: {
                    "open-type": "getUserInfo",
                    lang: "zh_CN",
                    eventid: "ed7a5576-2"
                  },
                  on: { getuserinfo: _vm.getUserInfo }
                },
                [_vm._v("授权")]
              )
            : _vm._e()
        ],
        1
      ),
      _vm.isLoadErr
        ? _c("loadErr", {
            attrs: { eventid: "ed7a5576-3", mpcomid: "ed7a5576-3" },
            on: { toRelaodData: _vm.toRelaodData }
          })
        : _vm._e(),
      _vm.isSharePage
        ? _c("backHome", { attrs: { mpcomid: "ed7a5576-4" } })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 135:
/*!************************************************************************************!*\
  !*** F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storeDetail.vue?vue&type=script&lang=js& */ 136);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Tools_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;































































var _quickSkeleton = _interopRequireDefault(__webpack_require__(/*! @/components/quick-skeleton.vue */ 52));

var _loadErr = _interopRequireDefault(__webpack_require__(/*! @/components/loadErr.vue */ 59));
var _backHome = _interopRequireDefault(__webpack_require__(/*! @/components/backHome.vue */ 89));
var _vuex = __webpack_require__(/*! vuex */ 12);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  data: function data() {
    return {
      isShowSkeleton: true,
      id: null,
      detailObj: {},
      storeImgs: [], //商品图片
      startTime: '',
      endTime: '',
      isLoadErr: false,
      isShowAccreditBox: false, //默认不显示授权弹框
      isSharePage: this.$isSharePage,

      isAuth: false };

  },
  components: { loadErr: _loadErr.default, skeleton: _quickSkeleton.default, backHome: _backHome.default },
  onLoad: function onLoad(options) {
    this.id = options.id;
    this.getDetailData();
    if (this.$userInfo) {
      this.isAuth = true;
    }
  },
  onShow: function onShow() {
    this.c_toSaveStoreInfo({});
  },
  methods: _objectSpread({},
  (0, _vuex.mapActions)([
  'c_toSaveStoreInfo']), {

    toPriviewImg: function toPriviewImg(idx) {
      var $this = this;
      uni.previewImage({
        current: $this.storeImgs[idx],
        urls: $this.storeImgs });

    },
    getUserInfo: function getUserInfo(e) {//按钮登录授权
      if (e.detail.errMsg == 'getUserInfo:ok') {
        uni.showLoading({
          title: '授权登陆中...',
          mask: true });

        var $this = this;
        this.$api.userLogin(function (status) {
          if (status == '1') {
            // if (!this.data.isFromOrdersStage) {
            uni.hideLoading();
            uni.showToast({
              title: '授权登录成功',
              icon: 'success',
              mask: true,
              success: function success() {
                $this.isAuth = true;
                if ($this.detailObj.goods_type == 1) {
                  uni.showLoading({
                    title: '正在调用支付...',
                    mask: true });

                  $this.toBuyCoupon();
                } else {
                  $this.c_toSaveStoreInfo($this.detailObj);
                  uni.navigateTo({
                    url: '/pages/receiverAddress/receiverAddress' });

                }
              } });

          }
        });
      } else {
        this.$api.warnNotice('您已拒绝授权！');
        this.isAuth = false;
      }
    },
    // toEmitShowAuth(status) {
    // 	this.isShowAccreditBox = status
    // 	this.getDetailData() //授权加载
    // },
    // accreditStatus: function() {
    //   const $this = this
    //   this.$api.userLogin((status) => {
    //     if (status == '1') {
    // 		this.isShowAccreditBox = false
    // 		this.getDetailData() //授权加载
    //     }else {
    // 		$this.isShowAccreditBox = true
    // 	}
    //   })
    // },
    toRelaodData: function toRelaodData() {
      this.isLoadErr = false;
      this.detailObj = {};
      this.storeImgs = [];
      this.getDetailData();
    },
    getDetailData: function getDetailData() {var _this = this;
      var $this = this;
      this.$api.ajax({
        url: this.$config.storeDetail,
        data: {
          goods_id: this.id } }).


      then(function (res) {
        if (res.statusCode == 200 && res.data.code == 0) {
          _this.detailObj = res.data.data;
          if (_this.detailObj.goods_type == 0) {
            _this.storeImgs = _this.detailObj.picture_arr.split(',');
          } else if (_this.detailObj.goods_type == 1) {
            _this.startTime = _this.detailObj.expire_start_date.split(' ')[0].replace(/-/g, '/');
            _this.endTime = _this.detailObj.expire_end_date.split(' ')[0].replace(/-/g, '/');
          }
          setTimeout(function () {
            _this.isShowSkeleton = false;
          }, 200);
        } else {
          _this.isShowSkeleton = false;
          _this.api.warnNotice(res.data.message);
          _this.isLoadErr = true;
        }
      }).
      catch(function () {
        _this.isShowSkeleton = false;
        _this.isLoadErr = true;
      });
    },
    bindToBuyStore: function bindToBuyStore() {
      if (this.detailObj.goods_type == 1) {
        uni.showLoading({
          title: '正在调用支付...',
          mask: true });

        this.toBuyCoupon();
      } else {
        this.c_toSaveStoreInfo(this.detailObj);
        uni.navigateTo({
          url: '/pages/receiverAddress/receiverAddress' });

      }
    },
    toBuyCoupon: function toBuyCoupon() {var _this2 = this;
      var $this = this;
      this.$api.ajax({
        url: this.$config.buyStore,
        method: 'POST',
        data: {
          uid: this.$userInfo.uid,
          openid: this.$userInfo.openid,
          goods_id: this.detailObj.goods_id,
          buy_num: 1,
          buy_json: JSON.stringify({
            "proName": $this.detailObj.goods_name,
            "proPrice": $this.detailObj.goods_price,
            "proImg": $this.detailObj.goods_thumb,
            "tips": $this.detailObj.goods_tips,
            "type": $this.detailObj.goods_type,
            "expireStart": $this.detailObj.expire_start_date,
            "expireEnd": $this.detailObj.expire_end_date }) } }).



      then(function (resolve) {
        if (resolve.statusCode == 200 && resolve.data.code == 0) {
          wx.hideLoading();
          uni.requestPayment({
            'timeStamp': resolve.data.data.timeStamp,
            'nonceStr': resolve.data.data.nonceStr,
            'package': resolve.data.data.package,
            'signType': resolve.data.data.signType,
            'paySign': resolve.data.data.paySign,
            success: function success(res) {
              if (res.errMsg == 'requestPayment:ok') {
                uni.showToast({
                  title: '支付成功',
                  icon: 'success',
                  success: function success() {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: "/pages/orderDetail/orderDetail?id=".concat(resolve.data.data.buy_id) });

                    }, 1500);
                  } });

              }
            },
            fail: function fail(res) {
              _this2.$api.warnNotice('支付失败');
            } });

        } else {
          wx.hideLoading();
          _this2.$api.warnNotice(resolve.data.message);
        }
      }).
      catch(function (err) {
        wx.hideLoading();
        _this2.$api.warnNotice('购买失败');
      });
    } }),

  onShareAppMessage: function onShareAppMessage() {
    var $this = this;
    return {
      path: "/pages/storeDetail/storeDetail?id=".concat($this.id),
      title: $this.detailObj.goods_name,
      imageUrl: $this.detailObj.goods_thumb };

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 7)["default"]))

/***/ }),

/***/ 137:
/*!*********************************************************************************************************************!*\
  !*** F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=style&index=0&id=3e803bf6&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../Tools/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storeDetail.vue?vue&type=style&index=0&id=3e803bf6&scoped=true&lang=scss& */ 138);
/* harmony import */ var _Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Tools_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Tools_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Tools_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Tools_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Tools_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storeDetail_vue_vue_type_style_index_0_id_3e803bf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 138:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/code/dayu/dayu/pages/storeDetail/storeDetail.vue?vue&type=style&index=0&id=3e803bf6&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[130,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/storeDetail/storeDetail.js.map