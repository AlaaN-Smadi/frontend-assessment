"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
	text: string;
	speed?: number;        // typing speed in ms
	className?: string;    // optional styling
	cursor?: boolean;      // toggle cursor on/off
}

export default function Typewriter({
	text,
	speed = 50,
	className = "",
	cursor = true
}: TypewriterProps) {
	const [displayed, setDisplayed] = useState("");

	useEffect(() => {
		let index = 0;

		const interval = setInterval(() => {
			setDisplayed(text.slice(0, index));
			index++;

			if (index > text.length) clearInterval(interval);
		}, speed);

		return () => clearInterval(interval);
	}, [text, speed]);

	return (
		<span className={`${className}`}>
			{displayed}
			{cursor && (
				<motion.span
					animate={{ opacity: [0, 1, 0] }}
					transition={{
						duration: 1.4,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				>
					|
				</motion.span>
			)}
		</span>
	);
}
