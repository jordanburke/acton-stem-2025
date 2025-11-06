import type { Atom, Bond, Molecule } from "./types"

// Element colors based on CPK coloring convention
const ELEMENT_COLORS: Record<string, string> = {
  H: "#FFFFFF", // White
  C: "#909090", // Grey
  N: "#3050F8", // Blue
  O: "#FF0D0D", // Red
  S: "#FFFF30", // Yellow
  P: "#FF8000", // Orange
  Fe: "#E06633", // Orange-brown
  Zn: "#7D80B0", // Blue-grey
}

// Van der Waals radii in Angstroms (scaled down for visualization)
const ELEMENT_RADII: Record<string, number> = {
  H: 0.3,
  C: 0.4,
  N: 0.4,
  O: 0.35,
  S: 0.45,
  P: 0.45,
  Fe: 0.5,
  Zn: 0.5,
}

// Helper to create atom with defaults
const createAtom = (id: number, element: string, x: number, y: number, z: number, simplified = false): Atom => ({
  id,
  element,
  position: [x, y, z],
  color: ELEMENT_COLORS[element] || "#FF00FF",
  radius: ELEMENT_RADII[element] || 0.4,
  simplified,
})

// Simplified Water Molecule (H2O)
const waterMolecule: Molecule = {
  id: "water",
  name: "Water (H₂O)",
  description:
    "The most abundant molecule on Earth. Essential for all known forms of life. Water's bent molecular structure gives it unique properties including high surface tension and excellent solvent capabilities.",
  formula: "H2O",
  atomCount: 3,
  bondCount: 2,
  category: "small-molecule",
  atoms: [
    createAtom(0, "O", 0, 0, 0), // Oxygen at center
    createAtom(1, "H", 0.96, 0, 0), // Hydrogen 1
    createAtom(2, "H", -0.24, 0.93, 0), // Hydrogen 2 (bent 104.5°)
  ],
  bonds: [
    { atom1: 0, atom2: 1, order: 1 }, // O-H bond
    { atom1: 0, atom2: 2, order: 1 }, // O-H bond
  ],
}

// DNA Double Helix - properly structured with two intertwining strands
const dnaMolecule: Molecule = (() => {
  const turns = 1.5 // Number of complete helix turns (reduced for clearer visualization)
  const basePairsPerTurn = 8 // Base pairs per turn (reduced for more visible twist)
  const totalBasePairs = Math.floor(turns * basePairsPerTurn) // 12 base pairs
  const helixRadius = 3.5 // Distance from center axis (increased for wider ladder)
  const risePerBasePair = 1.2 // Vertical distance between base pairs (increased for spacing)

  const atoms: Atom[] = []
  const bonds: Bond[] = []
  let atomId = 0

  // Base pair sequence: A-T, G-C, T-A, C-G, A-T, G-C, etc.
  const basePairSequence = ["A-T", "G-C", "T-A", "C-G"]

  // Generate both strands simultaneously with base pairs
  for (let i = 0; i < totalBasePairs; i++) {
    const angle = (i / basePairsPerTurn) * Math.PI * 2 // Angle for this base pair
    const height = i * risePerBasePair - (totalBasePairs * risePerBasePair) / 2 // Center vertically

    // Strand 1 - Phosphate backbone
    const strand1X = Math.cos(angle) * helixRadius
    const strand1Z = Math.sin(angle) * helixRadius
    const strand1P = atomId++
    atoms.push(createAtom(strand1P, "P", strand1X, height, strand1Z, true))

    // Strand 2 - Phosphate backbone (180° opposite)
    const strand2Angle = angle + Math.PI
    const strand2X = Math.cos(strand2Angle) * helixRadius
    const strand2Z = Math.sin(strand2Angle) * helixRadius
    const strand2P = atomId++
    atoms.push(createAtom(strand2P, "P", strand2X, height, strand2Z, true))

    // Get base pair for this rung
    const basePair = basePairSequence[i % basePairSequence.length]
    const [base1Type, base2Type] = basePair.split("-")

    // Create simplified nucleotide bases
    // Purines (A, G) are larger (double ring) - 3 atoms
    // Pyrimidines (T, C) are smaller (single ring) - 2 atoms

    const base1Atoms: number[] = []
    const base2Atoms: number[] = []

    // Base 1 position (1/3 from strand1)
    const base1X = strand1X * 0.66 + strand2X * 0.34
    const base1Z = strand1Z * 0.66 + strand2Z * 0.34

    // Base 2 position (2/3 from strand1)
    const base2X = strand1X * 0.34 + strand2X * 0.66
    const base2Z = strand1Z * 0.34 + strand2Z * 0.66

    // Create Base 1
    if (base1Type === "A") {
      // Adenine (purine) - double ring: 3 atoms (C, N, N)
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base1X, height, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base1X + 0.25, height + 0.15, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base1X - 0.25, height - 0.15, base1Z, true))
    } else if (base1Type === "G") {
      // Guanine (purine) - double ring: 3 atoms (C, N, O)
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base1X, height, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base1X + 0.25, height + 0.15, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "O", base1X - 0.25, height - 0.15, base1Z, true))
    } else if (base1Type === "T") {
      // Thymine (pyrimidine) - single ring: 2 atoms (C, O)
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base1X, height, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "O", base1X, height + 0.3, base1Z, true))
    } else {
      // Cytosine (pyrimidine) - single ring: 2 atoms (C, N)
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base1X, height, base1Z, true))
      base1Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base1X, height + 0.3, base1Z, true))
    }

    // Create Base 2
    if (base2Type === "A") {
      // Adenine (purine) - double ring: 3 atoms (C, N, N)
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base2X, height, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base2X + 0.25, height + 0.15, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base2X - 0.25, height - 0.15, base2Z, true))
    } else if (base2Type === "G") {
      // Guanine (purine) - double ring: 3 atoms (C, N, O)
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base2X, height, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base2X + 0.25, height + 0.15, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "O", base2X - 0.25, height - 0.15, base2Z, true))
    } else if (base2Type === "T") {
      // Thymine (pyrimidine) - single ring: 2 atoms (C, O)
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base2X, height, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "O", base2X, height + 0.3, base2Z, true))
    } else {
      // Cytosine (pyrimidine) - single ring: 2 atoms (C, N)
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "C", base2X, height, base2Z, true))
      base2Atoms.push(atomId)
      atoms.push(createAtom(atomId++, "N", base2X, height + 0.3, base2Z, true))
    }

    // Bonds for this base pair
    // Connect strand backbones to first atom of each base
    bonds.push({ atom1: strand1P, atom2: base1Atoms[0], order: 1 })
    bonds.push({ atom1: strand2P, atom2: base2Atoms[0], order: 1 })

    // Connect atoms within each base
    for (let j = 0; j < base1Atoms.length - 1; j++) {
      bonds.push({ atom1: base1Atoms[j], atom2: base1Atoms[j + 1], order: 1 })
    }
    for (let j = 0; j < base2Atoms.length - 1; j++) {
      bonds.push({ atom1: base2Atoms[j], atom2: base2Atoms[j + 1], order: 1 })
    }

    // Connect bases across (hydrogen bond) - center atoms of each base
    bonds.push({ atom1: base1Atoms[0], atom2: base2Atoms[0], order: 2 })

    // Connect to previous base pair in strand (except for first)
    if (i > 0) {
      // Calculate offset based on previous base sizes
      const prevBasePair = basePairSequence[(i - 1) % basePairSequence.length]
      const [prevBase1Type, prevBase2Type] = prevBasePair.split("-")
      const prevBase1Size = prevBase1Type === "A" || prevBase1Type === "G" ? 3 : 2
      const prevBase2Size = prevBase2Type === "A" || prevBase2Type === "G" ? 3 : 2
      const prevOffset = 2 + prevBase1Size + prevBase2Size // 2 phosphates + bases

      bonds.push({ atom1: strand1P - prevOffset, atom2: strand1P, order: 1 })
      bonds.push({ atom1: strand2P - prevOffset, atom2: strand2P, order: 1 })
    }
  }

  return {
    id: "dna",
    name: "DNA Double Helix",
    description:
      "The molecule that carries genetic instructions for life. DNA consists of two strands coiled around each other, with base pairs connecting them like rungs on a twisted ladder. Shows four nucleotide bases: Adenine (A) pairs with Thymine (T), and Guanine (G) pairs with Cytosine (C). Note: This is a simplified representation emphasizing the double helix structure and base pairing rules. In reality, each base is a complex ring structure made of carbon, nitrogen, oxygen, and hydrogen atoms.",
    formula: "Complex Polymer",
    atomCount: atoms.length,
    bondCount: bonds.length,
    category: "dna" as const,
    atoms,
    bonds,
  }
})()

// Simplified Hemoglobin (heme group with iron center)
const hemoglobinMolecule: Molecule = {
  id: "hemoglobin",
  name: "Hemoglobin (Heme Group)",
  description:
    "The oxygen-carrying protein in red blood cells. This shows a simplified representation of the heme group - a complex ring structure with an iron atom at its center that binds oxygen for transport throughout the body. The actual heme group has the formula C34H32FeN4O4 (75 atoms), but this model shows the essential structure with fewer atoms for educational clarity.",
  formula: "Simplified Model",
  atomCount: 45,
  bondCount: 48,
  category: "protein",
  atoms: [
    // Iron center
    createAtom(0, "Fe", 0, 0, 0, true),

    // Porphyrin ring - nitrogen atoms binding to iron
    createAtom(1, "N", 1.5, 0, 0, true),
    createAtom(2, "N", 0, 1.5, 0, true),
    createAtom(3, "N", -1.5, 0, 0, true),
    createAtom(4, "N", 0, -1.5, 0, true),

    // Porphyrin ring - carbon atoms forming the square
    createAtom(5, "C", 2, 0.5, 0, true),
    createAtom(6, "C", 2, 1, 0, true),
    createAtom(7, "C", 1.5, 1.5, 0, true),
    createAtom(8, "C", 1, 2, 0, true),
    createAtom(9, "C", 0.5, 2, 0, true),
    createAtom(10, "C", 0, 2.5, 0, true),
    createAtom(11, "C", -0.5, 2, 0, true),
    createAtom(12, "C", -1, 2, 0, true),
    createAtom(13, "C", -1.5, 1.5, 0, true),
    createAtom(14, "C", -2, 1, 0, true),
    createAtom(15, "C", -2, 0.5, 0, true),
    createAtom(16, "C", -2.5, 0, 0, true),
    createAtom(17, "C", -2, -0.5, 0, true),
    createAtom(18, "C", -2, -1, 0, true),
    createAtom(19, "C", -1.5, -1.5, 0, true),
    createAtom(20, "C", -1, -2, 0, true),
    createAtom(21, "C", -0.5, -2, 0, true),
    createAtom(22, "C", 0, -2.5, 0, true),
    createAtom(23, "C", 0.5, -2, 0, true),
    createAtom(24, "C", 1, -2, 0, true),
    createAtom(25, "C", 1.5, -1.5, 0, true),
    createAtom(26, "C", 2, -1, 0, true),
    createAtom(27, "C", 2, -0.5, 0, true),

    // Oxygen molecule bound to iron
    createAtom(28, "O", 0, 0, 1.5, true),
    createAtom(29, "O", 0, 0, 2, true),

    // Side chains (simplified)
    createAtom(30, "C", 2.5, 0.5, 0.5, true),
    createAtom(31, "C", 2.5, 1.5, 0.5, true),
    createAtom(32, "C", 0.5, 2.5, 0.5, true),
    createAtom(33, "C", -0.5, 2.5, 0.5, true),
    createAtom(34, "C", -2.5, 0.5, 0.5, true),
    createAtom(35, "C", -2.5, -0.5, 0.5, true),
    createAtom(36, "C", -0.5, -2.5, 0.5, true),
    createAtom(37, "C", 0.5, -2.5, 0.5, true),
    createAtom(38, "C", 2.5, -0.5, 0.5, true),
    createAtom(39, "C", 2.5, -1.5, 0.5, true),

    // Oxygen atoms in side chains
    createAtom(40, "O", 3, 1, 1, true),
    createAtom(41, "O", 1, 3, 1, true),
    createAtom(42, "O", -3, 1, 1, true),
    createAtom(43, "O", -1, -3, 1, true),
    createAtom(44, "O", 3, -1, 1, true),
  ],
  bonds: [
    // Iron to nitrogens
    { atom1: 0, atom2: 1, order: 1 },
    { atom1: 0, atom2: 2, order: 1 },
    { atom1: 0, atom2: 3, order: 1 },
    { atom1: 0, atom2: 4, order: 1 },

    // Iron to oxygen
    { atom1: 0, atom2: 28, order: 1 },
    { atom1: 28, atom2: 29, order: 2 },

    // Porphyrin ring bonds
    { atom1: 1, atom2: 5, order: 1 },
    { atom1: 5, atom2: 6, order: 2 },
    { atom1: 6, atom2: 7, order: 1 },
    { atom1: 7, atom2: 2, order: 1 },
    { atom1: 2, atom2: 8, order: 1 },
    { atom1: 8, atom2: 9, order: 2 },
    { atom1: 9, atom2: 10, order: 1 },
    { atom1: 10, atom2: 11, order: 2 },
    { atom1: 11, atom2: 12, order: 1 },
    { atom1: 12, atom2: 13, order: 2 },
    { atom1: 13, atom2: 3, order: 1 },
    { atom1: 3, atom2: 14, order: 1 },
    { atom1: 14, atom2: 15, order: 2 },
    { atom1: 15, atom2: 16, order: 1 },
    { atom1: 16, atom2: 17, order: 2 },
    { atom1: 17, atom2: 18, order: 1 },
    { atom1: 18, atom2: 19, order: 2 },
    { atom1: 19, atom2: 4, order: 1 },
    { atom1: 4, atom2: 20, order: 1 },
    { atom1: 20, atom2: 21, order: 2 },
    { atom1: 21, atom2: 22, order: 1 },
    { atom1: 22, atom2: 23, order: 2 },
    { atom1: 23, atom2: 24, order: 1 },
    { atom1: 24, atom2: 25, order: 2 },
    { atom1: 25, atom2: 1, order: 1 },
    { atom1: 1, atom2: 26, order: 1 },
    { atom1: 26, atom2: 27, order: 2 },
    { atom1: 27, atom2: 5, order: 1 },

    // Side chains
    { atom1: 6, atom2: 30, order: 1 },
    { atom1: 30, atom2: 31, order: 1 },
    { atom1: 31, atom2: 40, order: 1 },

    { atom1: 9, atom2: 32, order: 1 },
    { atom1: 32, atom2: 33, order: 1 },
    { atom1: 33, atom2: 41, order: 1 },

    { atom1: 15, atom2: 34, order: 1 },
    { atom1: 34, atom2: 35, order: 1 },
    { atom1: 35, atom2: 42, order: 1 },

    { atom1: 21, atom2: 36, order: 1 },
    { atom1: 36, atom2: 37, order: 1 },
    { atom1: 37, atom2: 43, order: 1 },

    { atom1: 26, atom2: 38, order: 1 },
    { atom1: 38, atom2: 39, order: 1 },
    { atom1: 39, atom2: 44, order: 1 },
  ],
}

// Glucose (β-D-glucopyranose) - accurate structure
const glucoseMolecule: Molecule = {
  id: "glucose",
  name: "Glucose",
  description:
    "The primary source of energy for cells and a fundamental building block of carbohydrates. Glucose is produced by plants during photosynthesis and is essential for cellular respiration. This shows β-D-glucopyranose, the most common ring form of glucose found in nature. The body breaks down sugars and starches into glucose to fuel cellular processes.",
  formula: "C₆H₁₂O₆",
  atomCount: 24,
  bondCount: 24,
  category: "small-molecule",
  atoms: [
    // Ring carbons (C1-C5) and ring oxygen
    createAtom(0, "C", 0, 0, 0), // C1
    createAtom(1, "C", 1.5, -0.5, 0), // C2
    createAtom(2, "C", 1.5, -2, 0), // C3
    createAtom(3, "C", 0, -2.5, 0), // C4
    createAtom(4, "C", -1, -1.5, 0.5), // C5
    createAtom(5, "O", -1, 0, 0.3), // Ring oxygen

    // C6 (outside ring, attached to C5)
    createAtom(6, "C", -2.2, -2, 1), // C6

    // Hydroxyl oxygens (OH groups attached to carbons)
    createAtom(7, "O", 0, 1.5, 0), // OH on C1
    createAtom(8, "O", 2.8, 0, 0), // OH on C2
    createAtom(9, "O", 2.8, -2.5, 0), // OH on C3
    createAtom(10, "O", 0, -4, 0), // OH on C4
    createAtom(11, "O", -3.2, -1.5, 1.5), // OH on C6

    // Hydrogens on carbons
    createAtom(12, "H", 0.3, -0.3, -1), // H on C1
    createAtom(13, "H", 1.3, -1, -1), // H on C2
    createAtom(14, "H", 1.3, -2.3, -1), // H on C3
    createAtom(15, "H", -0.3, -3, -1), // H on C4
    createAtom(16, "H", -1.5, -1.8, -0.5), // H on C5
    createAtom(17, "H", -2, -3, 0.5), // H on C6
    createAtom(18, "H", -2.7, -2.3, 2), // H on C6

    // Hydrogens on hydroxyl groups
    createAtom(19, "H", -0.5, 2.2, 0), // H on OH(C1)
    createAtom(20, "H", 3.5, 0.5, 0), // H on OH(C2)
    createAtom(21, "H", 3.5, -3, 0), // H on OH(C3)
    createAtom(22, "H", -0.5, -4.7, 0), // H on OH(C4)
    createAtom(23, "H", -4, -2, 1.5), // H on OH(C6)
  ],
  bonds: [
    // Ring bonds
    { atom1: 0, atom2: 1, order: 1 }, // C1-C2
    { atom1: 1, atom2: 2, order: 1 }, // C2-C3
    { atom1: 2, atom2: 3, order: 1 }, // C3-C4
    { atom1: 3, atom2: 4, order: 1 }, // C4-C5
    { atom1: 4, atom2: 5, order: 1 }, // C5-O
    { atom1: 5, atom2: 0, order: 1 }, // O-C1

    // C6 attachment
    { atom1: 4, atom2: 6, order: 1 }, // C5-C6

    // Hydroxyl groups to carbons
    { atom1: 0, atom2: 7, order: 1 }, // C1-OH
    { atom1: 1, atom2: 8, order: 1 }, // C2-OH
    { atom1: 2, atom2: 9, order: 1 }, // C3-OH
    { atom1: 3, atom2: 10, order: 1 }, // C4-OH
    { atom1: 6, atom2: 11, order: 1 }, // C6-OH

    // Hydrogens to carbons
    { atom1: 0, atom2: 12, order: 1 }, // C1-H
    { atom1: 1, atom2: 13, order: 1 }, // C2-H
    { atom1: 2, atom2: 14, order: 1 }, // C3-H
    { atom1: 3, atom2: 15, order: 1 }, // C4-H
    { atom1: 4, atom2: 16, order: 1 }, // C5-H
    { atom1: 6, atom2: 17, order: 1 }, // C6-H
    { atom1: 6, atom2: 18, order: 1 }, // C6-H

    // Hydrogens to hydroxyl oxygens
    { atom1: 7, atom2: 19, order: 1 }, // OH-H (C1)
    { atom1: 8, atom2: 20, order: 1 }, // OH-H (C2)
    { atom1: 9, atom2: 21, order: 1 }, // OH-H (C3)
    { atom1: 10, atom2: 22, order: 1 }, // OH-H (C4)
    { atom1: 11, atom2: 23, order: 1 }, // OH-H (C6)
  ],
}

// Export all molecules
export const molecules: Molecule[] = [waterMolecule, glucoseMolecule, dnaMolecule, hemoglobinMolecule]

export { ELEMENT_COLORS, ELEMENT_RADII }
