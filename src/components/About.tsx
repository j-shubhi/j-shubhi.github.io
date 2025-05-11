import { Award, Briefcase, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="\assets\images\shubhi_pfp.png"
              alt="Shubhi Jain"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-6">
            I’m a UI/UX Designer & Visual Artist with a background in Computer Science. I blend creative storytelling with functional design to craft intuitive interfaces and visually engaging digital experiences. From designing seamless user flows to creating pixel-perfect game art, I focus on building user-centered, impactful designs that connect.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p className="text-gray-600">2+ years in UI/UX Design</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Tools I love</h3>
                  <p className="text-gray-600">Figma • Adobe Illustrator • Photoshop • Pixelorama • Godot • HTML/CSS • Git • LaTeX</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Passion</h3>
                  <p className="text-gray-600">Creating meaningful experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}