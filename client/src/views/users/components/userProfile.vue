<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Profile</span>
        </div>
        <el-table :data="getUserFields" align="center">
          <el-table-column>
              <template slot-scope="scope">
                     <fa-icon :name="scope.row.icon" />
                    <span class="ml-2">{{scope.row.feature}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center">
              <template slot-scope="scope">
                  <template v-if="scope.row.feature=='Password'">
                      <el-button size="mini" type="primary" @click="passwordWindow = true">Update Password</el-button>
                  </template>
                  <template v-else>
                      <span> {{scope.row.value}}</span>
                  </template>
              </template>
          </el-table-column>
        </el-table>
        <el-dialog
        title="Change your password"
        :visible.sync="passwordWindow">
            <el-input type="password" v-bind="currentPassword" placeholder="Type your current password"></el-input>
            <el-input type="password" v-bind="newPassword" placeholder="Type your new password" style="margin-top: 20px;"></el-input>
            <el-input type="password" v-bind="newPasswordRepeat" placeholder="Type your new password (again)" style="margin-top: 20px;"></el-input>
            <span slot="footer">
                <el-button @click="passwordWindow=false">Cancel</el-button>
                <el-button type="primary" @click="updatePassword">Confirm</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            passwordWindow: false,
            currentPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'username',
            'profile',
        ]),
        getUserFields() {
            const ret = [{
                feature: 'Email',
                icon: 'envelope',
                value: this.user.email,
            }, {
                feature: 'Username',
                icon: 'user',
                value: this.profile.username,
                public: true,
            }, {
                feature: 'Roles',
                icon: 'users',
                value: this.profile.roles.join(', '),
                public: true,
            }, {
                feature: 'Password',
                icon: 'key',
            }]
            return this.isOwner ? ret : ret.filter((x) => x.public)
        },
        isOwner() {
            return this.user.username === this.profile.username
        },
    },

    methods: {
        async updatePassword() {
            return
            await this.$store.dispatch('updatePassword', {
                username: this.username,
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
                newPasswordRepeat: this.newPasswordRepeat,
            })

            this.passwordWindow = false
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
