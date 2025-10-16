<template>
  <img
    :src="iconUrl"
    :alt="iconName"
    :title="iconName"
    draggable="false"
    class="icon-svg"
    @click="clickIcon">
</template>

<script>
import { post } from '@/lib/Util'

export default {
  props: {
    iconName: {
      type: String,
      require: true,
      default: ''
    },
    iconId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconPath: ''
    }
  },
  computed: {
    iconUrl() {
      return 'http://10.1.11.181:9730/' + '/public/' + this.iconName
    }
  },
  // watch: {
  //   iconName: function() {
  //     this.getImg()
  //   }
  // },
  // created() {
  //   this.getImg()
  // },
  methods: {
    clickIcon() {
      console.log('点击==', this.iconId, this.iconName)
      this.$emit('click', {
        id: this.iconId,
        name: this.iconName
      })
    },
    getImg() {
      // this.iconPath = process.env.NUXT_ENV_ICON_URL + '/public/' + this.iconName
      // + res.data.resource
      // post('/iconImg/findById', { id: this.iconName }).then(res => {
      //   this.iconPath = res.success
      //     ? process.env.NUXT_ENV_ICON_URL + '/public/' + res.data.name
      //     : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACqklEQVR4nO2cP3LTQBSH34vTZphxByRXgDJHcJEjUFBwh0y4BDkAPU0oGNoMh3DJkIoZKMPgFBSMsxSxsP6stCtZ9m/G+b7G8ntP+1b6tCtXNgMAAAAAAAAAAAAAgH3Hs6rO58dmdmkWZmZ25CGsEsGsOF59ejlmwSys6zwSK+q8iEXyXo5V8qtzI7Hi2K08v3LezItYJO/lWOn6Hq6jGSuNeRfMrg/NLxYfXn1L3dq0gPP5sbnPLYRpdWLxCVYE1PJrAbULsGAeiUUF1OR6i7T2/OqzLD0ityJgkNRwe/83vPhz9fpH1+096Eo+jOiXZmHaTIRm6f/JdNDIx07oGWvp6bWy8pfqk5fbLz9twacHh/YuUZUhwGyWbpy+AG+taw+35zeRlkoVT/+AsUM95rNmUZUcAUfpxokRGhOrnuSR2PpwiLTYSsy4iRkPQnzPbh37SWLELAGVPS6z8YCnOl7Qa6vYqOfAVVX6mveLpkqegFiDHe7l8VND5IITqyoWy+45wrYXIUNAXpPmvplz2jb38lg+c1VFt8yhPbvptQJ2/wLeZC/f4AXct59ZWloL/QTs/AWcP43upOQFnEXyvfH0/fdhagdyenayy3Zb59Mz77zHPVcAjA0CxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQAwCxCBADALEIEAMAsQgQEzOn/bdbX8ae8vvVEFaQPAvo0zlEeJm16mapACfTC7M7NcoM3pc3C6X9jZVlBTw883zrz6ZvHTzKwu2GGdue83CzT7eL+3084nfqCcDAAAAAAAAAAAAAAB6/gHztkDOhvHqxwAAAABJRU5ErkJggg=='
      // })
    }
  }
}
</script>

<style scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  user-select: none;
}

img {
  opacity: 1;
  transition: opacity ease-in 0.2s;
}

img[src=''] {
  opacity: 0;
}
</style>
