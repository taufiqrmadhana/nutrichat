import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';

export default function FeedPage() {
  const posts = [
    {
      user: "Juan Siagian",
      time: "56 minutes ago",
      content: "It's tough going solo — join a community that gets you!",
      image: require('@/assets/post1.jpg'),
      comments: [
        { user: "RD", name: "Kevinza Faiz", time: "3 hours ago", content: "buat yang mau tau resep godo2ku, 500 kcal aja. Read more..." }
      ],
      likes: 42,
      shares: 15
    },
    {
      user: "Erwan Poltak",
      time: "2 hours ago",
      content: "New PB! 10km run in 55 minutes 🏃♀️💨",
      image: require('@/assets/post2.jpg'),
      comments: [
        { user: "RunLover", name: "Ricky Shokat", time: "1 hour ago", content: "Awesome! Join our running squad?" }
      ],
      likes: 89,
      shares: 24
    },
    {
      user: "Matthew Nicholas",
      time: "5 hours ago",
      content: "Morning routine: 1L water + 15min yoga 🌅🧘♂️",
      image: require('@/assets/post3.jpg'),
      comments: [],
      likes: 156,
      shares: 45
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
        <TouchableOpacity>
          <Image source={require('@/assets/camera-icon.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.createPost}>
          <Image source={require('@/assets/plus-icon.png')} style={styles.plusIcon} />
          <Text style={styles.createPostText}>Share your health journey today!</Text>
        </TouchableOpacity>

        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <View style={styles.userInfo}>
              <Image source={require('@/assets/image2.png')} style={styles.avatar} />
              <View style={styles.userMeta}>
                <Text style={styles.userName}>{post.user}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity>
                <Image source={require('@/assets/more-icon.png')} style={styles.moreIcon} />
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && (
              <Image source={post.image} style={styles.postImage} />
            )}

            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{post.likes} likes</Text>
              <Text style={styles.statsText}>{post.shares} shares</Text>
            </View>

            {post.comments.map((comment, cIndex) => (
              <View key={cIndex} style={styles.commentCard}>
                <Image source={require('@/assets/default-avatar.png')} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{comment.name}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}

            <View style={styles.actionBar}>
              <TouchableOpacity style={styles.actionButton}>
                <Image source={require('@/assets/like-icon.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Image source={require('@/assets/comment-icon.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Image source={require('@/assets/share-icon.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "bold",
  },
  cameraIcon: {
    width: 28,
    height: 28,
    tintColor: "#FFA500",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  createPost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFA500",
    marginRight: 12,
  },
  createPostText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "500",
  },
  postCard: {
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  postTime: {
    color: "#888",
    fontSize: 12,
  },
  moreIcon: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
  postContent: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  statsText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  commentCard: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  commentUser: {
    color: "#FFA500",
    fontSize: 12,
    fontWeight: "600",
  },
  commentTime: {
    color: "#888",
    fontSize: 10,
  },
  commentText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFA500",
    marginRight: 8,
  },
  actionText: {
    color: "#FFA500",
    fontSize: 12,
    fontWeight: "500",
  },
});