interface GradientSpinnerAProps {
    theme?: 'blue' | 'red' | 'green' | 'purple' | 'rainbow';
}

export const GradientSpinnerA = ({ theme = 'blue' }: GradientSpinnerAProps) => {
    const gradients = {
        blue: 'from-blue-700 via-sky-300 to-blue-700',
        red: 'from-red-700 via-pink-300 to-red-700',
        green: 'from-green-700 via-lime-300 to-green-700',
        purple: 'from-purple-700 via-pink-300 to-purple-700',
        rainbow: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
    }

    return (
        <div className={`absolute -inset-30 p-30 bg-conic-180 ${gradients[theme]} rounded-full transition-all duration-300 animate-[spin_3s_linear_infinite] opacity-75`} />    
    )
}