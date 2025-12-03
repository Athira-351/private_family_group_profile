<template>
  <div class="profile-view" v-if="member">
    <!-- Cover Photo -->
    <div class="cover-photo">
      <img :src="member.coverImage" :alt="member.name">
      <div class="back-button" @click="goBack">
        <span>← Back to Family</span>
      </div>
    </div>

    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-info">
        <img :src="member.profileImage" :alt="member.name" class="profile-image">
        <div class="member-details">
          <h1>{{ member.name }}</h1>
          <p class="role">{{ member.role }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs and Content Container -->
    <div class="tabs-and-content">
      <!-- Navigation Tabs -->
      <div class="tabs-container">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          :class="['tab-button', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="content-container">
        <!-- Timeline Tab -->
        <div v-if="activeTab === 'Timeline'" class="tab-content">
        <div class="timeline">
          <div v-for="post in member.timeline" :key="post.id" class="timeline-post">
            <div class="post-header">
              <img :src="member.profileImage" :alt="member.name" class="post-avatar">
              <div class="post-info">
                <p class="post-name">{{ member.name }}</p>
                <p class="post-date">{{ formatDate(post.date) }}</p>
              </div>
            </div>
            <p class="post-content">{{ post.content }}</p>
            <img v-if="post.image" :src="post.image" :alt="post.content" class="post-image">
          </div>
        </div>
      </div>

      <!-- About Tab -->
      <div v-if="activeTab === 'About'" class="tab-content">
        <div class="about-section">
          <h2>About {{ member.name }}</h2>
          
          <div class="info-group">
            <h3>Bio</h3>
            <p>{{ member.about.bio }}</p>
          </div>

          <div class="info-group">
            <h3>Basic Information</h3>
            <div class="info-item">
              <span class="label">Gender:</span>
              <span class="value">{{ member.about.gender }}</span>
            </div>
            <div class="info-item">
              <span class="label">Birthday:</span>
              <span class="value">{{ member.about.birthday }}</span>
            </div>
            <div class="info-item">
              <span class="label">Place:</span>
              <span class="value">{{ member.about.place }}</span>
            </div>
          </div>

          <div class="info-group">
            <h3>Work</h3>
            <div class="info-item">
              <span class="label">Position:</span>
              <span class="value">{{ member.about.workDetails.position }}</span>
            </div>
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">{{ member.about.workDetails.company }}</span>
            </div>
            <div class="info-item">
              <span class="label">Since:</span>
              <span class="value">{{ member.about.workDetails.startDate }}</span>
            </div>
          </div>

          <div class="info-group">
            <h3>Education</h3>
            <div class="info-item">
              <span class="label">School:</span>
              <span class="value">{{ member.about.education.school }}</span>
            </div>
            <div class="info-item">
              <span class="label">University:</span>
              <span class="value">{{ member.about.education.university }}</span>
            </div>
            <div class="info-item">
              <span class="label">Degree:</span>
              <span class="value">{{ member.about.education.degree }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Photos Tab -->
      <div v-if="activeTab === 'Photos'" class="tab-content">
        <div class="photos-gallery">
          <img v-for="(photo, index) in member.photos" :key="index" :src="photo" :alt="`Photo ${index + 1}`" class="photo-item">
        </div>
      </div>

      <!-- Family Tab -->
      <div v-if="activeTab === 'Family'" class="tab-content">
        <div class="family-members">
          <div 
            v-for="familyMember in otherMembers" 
            :key="familyMember.id"
            class="family-member-card"
            @click="navigateToMember(familyMember.id)"
          >
            <img :src="familyMember.profileImage" :alt="familyMember.name" class="family-member-image">
            <h4>{{ familyMember.name }}</h4>
            <p>{{ familyMember.role }}</p>
            <div class="card-overlay">
              <span>View Profile</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading profile...</div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFamilyMember, getOtherFamilyMembers } from '../data/familyData'
import '../styles/ProfileView.css'

export default {
  name: 'ProfileView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('Timeline')
    const tabs = ['Timeline', 'About', 'Photos', 'Family']

    const member = computed(() => {
      return getFamilyMember(route.params.memberId)
    })

    const otherMembers = computed(() => {
      return getOtherFamilyMembers(route.params.memberId)
    })

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const goBack = () => {
      router.push('/')
    }

    const navigateToMember = (memberId) => {
      router.push(`/profile/${memberId}`)
    }

    watch(() => route.params.memberId, () => {
      activeTab.value = 'Timeline'
    })

    return {
      member,
      otherMembers,
      activeTab,
      tabs,
      formatDate,
      goBack,
      navigateToMember
    }
  }
}
</script>


