import { PrismaClient } from "@prisma/client";

export class LevelSystemService {

    constructor(private prisma: PrismaClient) {}
    /**
     * Levels up a student if their exp after adding expGained meets the threshold.
     * @param studentId The student's ID
     * @param expGained The amount of exp to add
     * @returns The updated student with new level and exp, or an error message if not possible.
     */
    async levelUp(studentId: number, expGained: number) {
        // Get the student
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            throw new Error("Student not found");
        }

        // Add expGained to the student's exp
        let newExp = student.exp + expGained;
        let newLevel = student.level;

        // Get the next level threshold
        const nextThreshold = await this.prisma.level_Threshold.findFirst({
            where: {
                level: { gt: student.level }
            },
            orderBy: { level: "asc" }
        });

        if (nextThreshold && newExp >= nextThreshold.exp_required) {
            // Level up
            newLevel = nextThreshold.level;
            newExp = 0; // Typically, reset exp to 0 after level up
        }

        const updatedStudent = await this.prisma.student.update({
            where: { id: studentId },
            data: {
                level: newLevel,
                exp: newExp
            }
        });

        return updatedStudent;
    }
}