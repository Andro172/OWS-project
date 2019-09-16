<template>
  <div>
    <div class="pt-3 gray-bg">
      <b-row class="text-left m-2">
        <b-col>
          <h3>Users</h3>
        </b-col>
        <b-col>
            <b-form-input size="sm"  placeholder="Find..." style="width:auto; float:right;"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="grayBox m-0 p-0 text-left" style="border-left:0;border-right:0;">
        <b-col>
          <div class="m-2">
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(0)}" @click="active = 0;">
              Name
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(1)}" @click="active = 1">
              Most Points
            </span>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="active === 0" class="justify-content-center text-left m-0 p-0">
      <b-col v-for="(user,index) in NameUsers" :key="index" class="col-4 col-md-3 ml-md-3 mr-md-3 ml-1 mr-1 mt-3 mb-5">
        <b-img :src="user.profile" alt="profile" fluid rounded="circle" class="avatar"></b-img>
        
        <h6 class="bold mt-2 mb-0 pointer" @click="GoToAccount(user)">{{user.username}}</h6>
        <p class="mb-0">{{user.address}}</p>
        <b-badge variant="warning" style="color:white;background:#d77732;">{{user.profession}}</b-badge>
        <span class=" gradColor1 bold">
          {{user.points}} points
        </span>
      </b-col>
    </b-row>

    <b-row v-if="active === 1" class="justify-content-center text-left m-0 p-0">
      <b-col v-for="(user,index) in PointsUsers" :key="index" class="col-4 col-md-3 ml-md-3 mr-md-3 ml-1 mr-1 mt-3 mb-5">
        <b-img :src="user.profile" alt="profile" fluid rounded="circle" class="avatar"></b-img>
        
        <h6 class="bold mt-2 mb-0">{{user.username}}</h6>
        <p class="mb-0">{{user.address}}</p>
        <b-badge variant="warning" style="color:white;background:#d77732;">{{user.profession}}</b-badge>
        <span class=" gradColor1 bold">
          {{user.points}} points
        </span>
      </b-col>
    </b-row>
      
  </div>
</template>

<script>
export default {
  name: "Users",
  data(){
    return {
      users: [],
      active: 0
    }
  },
  methods:{
    GoToAccount(user){
      this.$router.push({ name: "Account", params: { user: user }});
    },
    GetUsers(){
      for(let i = 0;i < 13; ++i){
        this.users.push({
          username: i + "test user",
          profile: require("../assets/avatar.jpeg"),
          points: Math.floor(Math.random() * Math.floor(100 * (i + 1))),
          profession: "Proffession",
          address: "address"
        })
      }
    },
    isActive(val){
      return val === this.active;
    }
  },
  computed:{
    NameUsers(){
      return this.users.sort((a,b) => {
        let x = a.username.toLowerCase();
        let y = b.username.toLowerCase();
        if(x < y){
          return -1
        }
        else if(x > y){
          return 1
        }
        return 0;
      });
    },
    PointsUsers(){
      return this.users.sort((a,b) => {
        return b.points - a.points;
      });
    }
  },
  created(){
    this.GetUsers();
  },
  beforeDestroy(){
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.itemWrap{
  margin: auto;
  padding: 5px;
  cursor: pointer;
  word-wrap:break-word;
}
.itemWrap:hover{
  border-bottom: 5px solid #D77732;
  color: black;
}

.itemWrapActive{
  border-bottom: 5px solid #D77732;
  color: black;
}
</style>
