
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import Header from '@/components/home/Header';
import TodayRitualCard from '@/components/home/TodayRitualCard';
import ProgressSection from '@/components/home/ProgressSection';
import MainActions from '@/components/home/MainActions';
import PremiumCTA from '@/components/home/PremiumCTA';
import LoadingScreen from '@/components/home/LoadingScreen';

const Index = () => {
  const { signOut } = useAuth();
  const { profile, progress, loading } = useUserData();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      <Header profile={profile} />
      <TodayRitualCard />
      <ProgressSection progress={progress} />
      <MainActions />
      <PremiumCTA />
    </div>
  );
};

export default Index;
