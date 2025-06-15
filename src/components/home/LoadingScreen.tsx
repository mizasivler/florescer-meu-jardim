
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-2xl">🌸</span>
        </div>
        <p className="text-gray-700 font-medium text-lg">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
