<template>
  <div id="app">

    <b-navbar id="navbar" ref="navbar" toggleable="lg" type="dark" variant="faded">
      <b-navbar-brand to="/" style="outline:0;" class="ml-md-5 title bold">Lost Questions</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-form>
          <b-form-input size="sm"  placeholder="Search" style="width:auto;"></b-form-input>
        </b-nav-form>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav v-if="!LoggedIn" class="ml-auto mr-md-5">
          <b-nav-item href="#" v-b-modal.loginModal>Login</b-nav-item>
          <b-nav-item href="#" v-b-modal.registerModal>Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto mr-md-5">
          <b-nav-item to="/account">{{Username}}</b-nav-item>
          <b-nav-item href="#" @click.stop="Logout()">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    

    <b-row class="m-0 p-0">
      <b-col class="p-0 col-2 sidebar">
        <Sidebar @login="$refs.loginModal.show()"></Sidebar>
      </b-col>
      <b-col class="vh100 p-0">
        
        <router-view />
      </b-col>
    </b-row>


    <!-- LOGIN MODAL -->

    <b-modal lazy 
              title="Login"
              ref="loginModal" 
              id="loginModal" 
              centered size="md" 
              scrollable
              hide-footer
              body-class="m-0 p-0 grad white-color"
              @hidden="resetLoginInfo()">

              <div v-if="!Loading" class="m-3">
                <b-form @submit="handleLogin">
                  <label for="username">Your Username</label>
                  <b-form-input id="username" v-model="loginInfo.username" type="text" placeholder="Username" required></b-form-input>
                  <br>
                  <label for="password">Your Password</label>
                  <b-form-input v-model="loginInfo.password" type="password" placeholder="Password" required></b-form-input>
                  <br>
                  <div class="text-center">
                    <b-btn variant="success" pill  type="submit">Login</b-btn>
                    <router-link to="/" class="ml-3 link">forgot password?</router-link>
                  </div>

                  <hr class="line">
                  <div class="text-center">
                    <span class="link pointer bold mr-2" @click="SwitchModals('loginModal','registerModal')">Sign up here </span>
                    or sign up with 
                    <b-btn variant="danger" pill class="ml-2">Google</b-btn>
                  </div>
                  
                </b-form>
              </div>

              <div v-else class="text-center py-5">
                <p>logging in...</p><b-spinner variant="info" label="Spinning"></b-spinner>
              </div>

          
      </b-modal>




    <!-- REGISTER MODAL -->

    <b-modal lazy 
              title="Register"
              ref="registerModal" 
              id="registerModal" 
              centered size="md" 
              scrollable
              hide-footer
              body-class="m-0 p-0 grad white-color"
              @hidden="resetRegisterInfo()">

              <div v-if="!Loading" class="m-3">
                <b-form @submit="handleRegister">
                  <label for="username">Your Username</label>
                  <b-form-input id="username" v-model="registerInfo.username" type="text" placeholder="Username" required></b-form-input>
                  <br>
                  <label for="username">Your Email</label>
                  <b-form-input id="username" v-model="registerInfo.email" type="email" placeholder="example@something.com" required></b-form-input>
                  <br>
                  <label for="password">Your Password</label>
                  <b-form-input v-model="registerInfo.password" type="password" placeholder="Password" required></b-form-input>
                  <br>
                  <label for="password">Retype Password</label>
                  <b-form-input v-model="registerInfo.retryPass" type="password" placeholder="Password" required></b-form-input>
                  <br>
                  <b-alert v-if="isError" show variant="warning">{{isError}}</b-alert>
                  <div class="text-center">
                    <b-btn variant="success" pill  type="submit">Register</b-btn>
                    <span class="link pointer bold ml-5" @click="SwitchModals('registerModal','loginModal')">Login</span>
                  </div>
                  
                </b-form>
              </div>

              <div v-else class="text-center py-5">
                <p>registering...</p><b-spinner variant="info" label="Spinning"></b-spinner>
              </div>

          
      </b-modal>



  </div>
</template>

<script>
import Sidebar from "./components/sidebar";
export default {
  data(){
    return{
      modalLoading: false,
      loginInfo:{
        username: null,
        password: null
      },
      registerInfo:{
        username: null,
        email: null,
        password: null,
        retryPass: null
      },
      error: null
    }
  },
  components: {
    Sidebar
  },
  methods:{
    SwitchModals(openRef,closedRef){
      this.$refs[closedRef].show();
      this.$refs[openRef].hide();
    },
    resetLoginInfo(){
      this.loginInfo.username = null;
      this.loginInfo.password = null;
    },
    resetRegisterInfo(){
      this.registerInfo.username = null;
      this.registerInfo.password = null;
      this.registerInfo.retryPass = null;
      this.registerInfo.email = null;
    },
    handleRegister(evt){
      evt.preventDefault();
      if(this.registerInfo.password != this.registerInfo.retryPass){
        return this.error = "Your passwords must match, please try again!";
      }
      this.modalLoading = true;
      this.Login(this.registerInfo);
      this.modalLoading = false;
      this.$refs.registerModal.hide();
      this.error = null
    },
    handleLogin(evt){
      evt.preventDefault();
      this.modalLoading = true;
      this.Login(this.loginInfo);
      this.modalLoading = false;
      this.$refs.loginModal.hide();
    },
    Login(info){
      this.$store.commit('setUser', JSON.parse(JSON.stringify(info)));
      this.$store.commit('setLoginStatus', true);
      localStorage.setItem("user", JSON.stringify(info));
    },
    Logout(){
      this.$store.commit('setUser', null);
      this.$store.commit('setLoginStatus', false);
      localStorage.removeItem("user");
      this.$router.push("/");
    }
  },
  computed:{
    isMobile(){
      return this.$store.state.mobile;
    },
    Loading(){
      return this.modalLoading;
    },
    Username(){
      return this.$store.state.user.username;
    },
    LoggedIn(){
      return this.$store.state.isLoggedIn;
    },
    isError(){
      return this.error;
    }
  },
  created(){
    let clientWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if(clientWidth < 800){
        this.$store.commit('isMobile', true);
    }
  },
  mounted(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user){
      this.$store.commit('setUser', user);
      this.$store.commit('setLoginStatus', true);
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
    display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F4F4F4;
}

#navbar{
  background: #2b5876 !important;  /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #4e4376, #2b5876) !important;  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(right, #4e4376, #2b5876) !important; 
}
nav .navbar-nav li a{
  color: white !important;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  outline: 0;
}
nav .navbar-nav li a:hover{
  opacity: 0.9;
  color: #D77732 !important;
}
.title:hover{
  color: #D77732 !important;
  opacity: 0.9;
}


.orange{
  color: #D77732;
}
.bold {
  font-weight: bold !important;
}
.abs{
  position: absolute !important;
}
.pointer:hover{
  cursor: pointer;
}
.vh100{
  min-height: 100vh;
}
.line{
  background: #F4F4F4;
  border-top: 1px solid #E2E2E2;
  height: 2px;
  width: 100%;
}
.black-color{
  color: black;
}
.white-color{
  color: white;
}

.grayBox {
  background: #F4F4F4;
  border: 1px solid #E2E2E2;
}
.gray-bg{
  background: #F4F4F4;
}

.gray-color{
  color: #e4e4e4;
}

.gradColor1{
  color: #4e4376;
}
.gradColor2{
  color: #2b5876;
}
.grad {
  background: #2b5876 !important;  /* fallback for old browsers */
  background: -webkit-linear-gradient(bottom, #4e4376, #2b5876) !important;  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(bottom, #4e4376, #2b5876) !important;
}

.btn{
  box-shadow: none!important;
  outline: none!important;
  cursor: pointer;
}
/* button succes override */
.btn-success{
  background-color: #D77732!important;
  border-color: #D77732!important;
}
.btn-success:hover{
  background-color: #BE6829!important;
}


/* links */
.link{
  color: #D77732 !important;
  font-style: italic;
  font-weight: normal;
  text-align: center;
  text-decoration: none !important;
  outline: 0;
  opacity: 0.9;
}
.link:hover{
  opacity: 1;
  text-shadow: 0.2px 0.2px 1px #BE6829;
}

.avatar{
  object-fit: cover;
  width: 50px;
  height: 50px;
}

.sidebar{
  display: none;
}
@media (min-width: 1000px) {
  .sidebar {
    display: block;
  }
}
</style>
