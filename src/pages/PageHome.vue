<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newQweetContent"
            class="new-qweet"
            placeholder="What`s happening?"
            maxlength="200"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://avatars.githubusercontent.com/u/57122180?v=4"
                  alt="avatar"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            class="q-mb-lg"
            no-caps
            :disable="!newQweetContent"
            unelevated
            rounded
            color="primary"
            label="Qweet"
          />
        </div>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />
      <q-list>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="qweet in qweets" :key="qweet.id" class="q-py-md qweet">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://avatars.githubusercontent.com/u/57122180?v=4"
                  alt="avatar"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Minsoo Kim</strong>
                <span class="text-grey-7">
                  @minsoo-web
                  <br class="lt-md" />
                  &bull;{{ qweet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">{{
                qweet.content
              }}</q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="toggleLiked(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />

                <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from "date-fns";
import ko from "date-fns/locale/ko";

import db from "src/boot/firebase";

export default {
  name: "PageHome",
  data: () => ({
    newQweetContent: "",
    qweets: []
  }),
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date(), { locale: ko });
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      };
      this.newQweetContent = "";

      db.collection("qweets")
        .add(newQweet)
        .then(() => {
          console.log("object");
        });
    },
    deleteQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .delete();
    },
    toggleLiked(qweet) {
      // console.log(qweet);
      db.collection("qweets")
        .doc(qweet.id)
        .update({ liked: !qweet.liked });
    }
  },
  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New qweet: ", change.doc.data());
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", change.doc.data());
            let index = this.qweets.findIndex(
              qweet => qweet.id === qweetChange.id
            );
            Object.assign(this.qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", change.doc.data());
            let index = this.qweets.findIndex(
              qweet => qweet.id === qweetChange.id
            );
            this.qweets.splice(index, 1);
          }
        });
      });
  }
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.qweet +.qweet
  border-top: 1px solid rgba(0,0,0, 0.12)

.qweet-content
  white-space: pre-line

.qweet-icons
  margin-left: -5px
</style>
