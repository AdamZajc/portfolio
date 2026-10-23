'use client'
import { motion } from "motion/react";
import {gallery} from "@/data/store";
import {useCallback} from "react";

export default function PhotoChip() {
    const rand = useCallback(() => Math.random(), []);
    const img = gallery[Math.round(rand() * (gallery.length - 1))];

    return <motion.div
        className={"w-full h-80 mt-6 -z-50"}
        style={{
            background: `url("${img}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: rand()*5 }}
    >
    </motion.div>
}