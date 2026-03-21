import { Redirect } from 'expo-router';

export default function Index() {
  // Không cần giao diện, chuyển hướng thẳng vào Home
  return <Redirect href="/(tabs)/home" />;
}