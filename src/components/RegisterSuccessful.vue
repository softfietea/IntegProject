<template>
    <v-container grid-list-lg align="center">
        <v-layout row wrap>
    <v-flex xs12>
        <v-card color="primary" class="red--text">
            <v-container fluid grid-list-lg>
                <v-layout row>
                    <v-flex xs7>
                        <div>
                            <div class="headline">Thank you for Registering your account</div>
                            <div>you can now navigate to different alfie's activity</div>
                            <button @click="this.$router.push('PersonalLife')"> Click here</button>
                        </div>
                    </v-flex>
                    <v-flex xs5>
                        <v-card-media
                            src="description"
                            height="125px"
                            contain
                        ></v-card-media>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-flex>
</v-layout>
    </v-container>

</template>


<script setup>


</script>