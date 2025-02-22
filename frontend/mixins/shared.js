import moment from 'moment'
import store from '../store.js'
import api from '../api/api'

import english from '../translations/english'
import spanish from '../translations/spanish'
import german from '../translations/german'
import indonesian from '../translations/indonesian'

const funcs = {
  methods: {

    /**
     * example:
     *      lang("{0} is dead, but {1} is alive! {0} {2}", "HTML", "HTML5")
     * output:
     *      HTML is dead, but HTML5 is alive! HTML {2}
     **/
    lang(term, ...rest) {

      let available_languages = {
        'english': english,
        'spanish': spanish,
        'german': german,
        'indonesian': indonesian,
        'hungarian': hungarian,
      }

      let language = store.state.config.language

      let args = rest
      if(!available_languages[language] || available_languages[language][term] == undefined) {
        // translation required
        return 'TR: '+term
      }
      return available_languages[language][term].replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
      })
    },
    is(role) {
      return this.$store.state.user.role == role
    },
    can(permissions) {
      return this.$store.getters.hasPermissions(permissions)
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    formatDate(timestamp) {
      return moment.unix(timestamp).format('YY/MM/DD hh:mm:ss')
    },
    checkUser() {
      api.getUser()
        .then((user) => {
          if (user.username !== store.state.user.username) {
            this.$store.commit('destroyUser', user)
            this.$toast.open({
              message: this.lang('Please log in'),
              type: 'is-danger',
            })
          }
        })
        .catch(() => {
          this.$toast.open({
            message: this.lang('Please log in'),
            type: 'is-danger',
          })
        })
    },
    handleError(error) {
      this.checkUser()

      if (typeof error == 'string') {
        this.$toast.open({
          message: this.lang(error),
          type: 'is-danger',
          duration: 5000,
        })
        return
      } else if (error && error.response && error.response.data && error.response.data.data) {
        this.$toast.open({
          message: this.lang(error.response.data.data),
          type: 'is-danger',
          duration: 5000,
        })
        return
      }

      this.$toast.open({
        message: this.lang('Unknown error'),
        type: 'is-danger',
        duration: 5000,
      })
    }
  }
}

export default funcs
