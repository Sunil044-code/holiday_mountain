import { TrekPackage } from "../models/package.model.js";
import { Trek } from "../models/trek.model.js";

// Create Package
const createPackage = async (req, res) => {
  try {
    const { trekId } = req.params;

    const {
      package_name,
      package_type,
      price,
      group_size,
      status,
      includedMeal,
      includedTransport,
      includedAccomodation,
    } = req.body;

    // Validation
    if (
      !package_name ||
      !package_type ||
      !price ||
      !group_size
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check trek exists
    const trek = await Trek.findById(trekId);

    if (!trek) {
      return res.status(404).json({
        success: false,
        message: "Trek not found",
      });
    }

    // Prevent duplicate package types for same trek
    const existingPackage = await TrekPackage.findOne({
      trek_id: trekId,
      package_type,
    });

    if (existingPackage) {
      return res.status(409).json({
        success: false,
        message: `${package_type} package already exists for this trek`,
      });
    }

    const newPackage = await TrekPackage.create({
      trek_id: trekId,
      package_name,
      package_type,
      price,
      group_size,
      status,
      includedMeal,
      includedTransport,
      includedAccomodation,
    });

    // OPTIONAL:
    // If Trek schema contains packages: [{ type: ObjectId, ref: "TrekPackage" }]
    // await Trek.findByIdAndUpdate(trekId, {
    //   $push: { packages: newPackage._id }
    // });

    return res.status(201).json({
      success: true,
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get All Packages By Trek
const getPackagesByTrek = async (req, res) => {
  try {
    const { trekId } = req.params;

    const trek = await Trek.findById(trekId);

    if (!trek) {
      return res.status(404).json({
        success: false,
        message: "Trek not found",
      });
    }

    const packages = await TrekPackage.find({
      trek_id: trekId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalPackages: packages.length,
      packages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Single Package
const getPackageById = async (req, res) => {
  try {
    const { packageId } = req.params;

    const packageData = await TrekPackage.findById(packageId);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      package: packageData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Package
const updatePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const updatedPackage = await TrekPackage.findByIdAndUpdate(
      packageId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Package
const deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const packageData = await TrekPackage.findById(packageId);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    await TrekPackage.findByIdAndDelete(packageId);

    // OPTIONAL:
    // Remove package reference from Trek if storing package IDs
    // await Trek.findByIdAndUpdate(packageData.trek_id, {
    //   $pull: { packages: packageId }
    // });

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export {
  createPackage,
  getPackagesByTrek,
  getPackageById,
  updatePackage,
  deletePackage,
};