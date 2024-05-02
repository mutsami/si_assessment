'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">si-assessment documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AlbumModule.html" data-type="entity-link" >AlbumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AlbumModule-15666c1ac444d9a3e6dcbea6cb3b28617e2560cb67676891749b3d56a5193e665bda70100f826eabf89514a0e98ebfbf85dd3a401787e8d784116e1d7b60afbb"' : 'data-bs-target="#xs-components-links-module-AlbumModule-15666c1ac444d9a3e6dcbea6cb3b28617e2560cb67676891749b3d56a5193e665bda70100f826eabf89514a0e98ebfbf85dd3a401787e8d784116e1d7b60afbb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlbumModule-15666c1ac444d9a3e6dcbea6cb3b28617e2560cb67676891749b3d56a5193e665bda70100f826eabf89514a0e98ebfbf85dd3a401787e8d784116e1d7b60afbb"' :
                                            'id="xs-components-links-module-AlbumModule-15666c1ac444d9a3e6dcbea6cb3b28617e2560cb67676891749b3d56a5193e665bda70100f826eabf89514a0e98ebfbf85dd3a401787e8d784116e1d7b60afbb"' }>
                                            <li class="link">
                                                <a href="components/AlbumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlbumRoutingModule.html" data-type="entity-link" >AlbumRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' : 'data-bs-target="#xs-components-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' :
                                            'id="xs-components-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerificationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' :
                                        'id="xs-injectables-links-module-AppModule-8d375a240e241f262c0fdd12452fb27011d689820746e66f01d80936779df1c60cceb843fe4d20ee5047493244eaff999f3a8fc615dc41b22f3f42dc226d6fbb"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PhotoModule.html" data-type="entity-link" >PhotoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PhotoModule-b7cf890798d0ed7345d0b2bb5c8b6882efb88261524753f30f9ede7d906e94f45cbcd33456901da7721e57f91f3ad59dd47c8685c33dc860fa945f1cca252832"' : 'data-bs-target="#xs-components-links-module-PhotoModule-b7cf890798d0ed7345d0b2bb5c8b6882efb88261524753f30f9ede7d906e94f45cbcd33456901da7721e57f91f3ad59dd47c8685c33dc860fa945f1cca252832"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PhotoModule-b7cf890798d0ed7345d0b2bb5c8b6882efb88261524753f30f9ede7d906e94f45cbcd33456901da7721e57f91f3ad59dd47c8685c33dc860fa945f1cca252832"' :
                                            'id="xs-components-links-module-PhotoModule-b7cf890798d0ed7345d0b2bb5c8b6882efb88261524753f30f9ede7d906e94f45cbcd33456901da7721e57f91f3ad59dd47c8685c33dc860fa945f1cca252832"' }>
                                            <li class="link">
                                                <a href="components/PhotoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhotoRoutingModule.html" data-type="entity-link" >PhotoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' : 'data-bs-target="#xs-components-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' :
                                            'id="xs-components-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' :
                                            'id="xs-pipes-links-module-SharedModule-33b1b24cb76acd7e381607b41654299027088242f5a2087a517b4de2a8b032a6dff5993b86f7aff0f845f4ff38bff336b4997c06a1f72eedfd33678018358354"' }>
                                            <li class="link">
                                                <a href="pipes/DateAgoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateAgoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedRoutingModule.html" data-type="entity-link" >SharedRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-824ea909116355e45a281479108fa04e0ab832064a2a3586e4db24b8d1a8058bc31900c7341651999c8cfc40966d9f44923708bfcb70004e075b12e4f37ec7ea"' : 'data-bs-target="#xs-components-links-module-UserModule-824ea909116355e45a281479108fa04e0ab832064a2a3586e4db24b8d1a8058bc31900c7341651999c8cfc40966d9f44923708bfcb70004e075b12e4f37ec7ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-824ea909116355e45a281479108fa04e0ab832064a2a3586e4db24b8d1a8058bc31900c7341651999c8cfc40966d9f44923708bfcb70004e075b12e4f37ec7ea"' :
                                            'id="xs-components-links-module-UserModule-824ea909116355e45a281479108fa04e0ab832064a2a3586e4db24b8d1a8058bc31900c7341651999c8cfc40966d9f44923708bfcb70004e075b12e4f37ec7ea"' }>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});