import { Company } from "../models/company.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerCompany = asyncHandler(async (req, res) => {
  const {
    companyName,
    revenue,
    foundedYear,
    keywords,
    location,
    companyEmail,
    website,
    description,
    industry,
  } = req.body;

  if (
    !companyName ||
    !revenue ||
    !foundedYear ||
    !keywords ||
    !location ||
    !companyEmail ||
    !website ||
    !description ||
    !industry
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const company = await Company.create({
    companyName,
    revenue,
    foundedYear,
    keywords,
    location,
    companyEmail,
    website,
    description,
    industry,
  });

  const createdCompany = await Company.findById(company._id).select(
    "-industry"
  );

  if (!createdCompany) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdCompany, "User registered Successfully"));
});

// const getAllDet = asyncHandler(async(req, res) => {
//     const companies = await Company.find();

//     if (!companies || companies.length === 0) {
//         throw new ApiError(500, "Data Not Found");
//       }
//     return res
//     .status(200)
//     .json(new ApiResponse(
//         200,
//         companies,
//         "User fetched successfully"
//     ))
// })

// const companySearch = asyncHandler(async (req, res) => {
//     const { q } = req.query;
//     // console.log(q);
//     if (!q) {
//         throw new ApiError(500, "Search query parameter 'q' not found");
//     }

//     const companies = await Company.find({ companyName: { $regex: q, $options: "i" } });

//     return res.status(200).json(new ApiResponse(
//         200,
//         companies,
//         "Companies fetched successfully"
//     ));
// });
// const companySort = asyncHandler(async (req, res) => {
//     const { _sort } = req.query;

//     if (!_sort) {
//         throw new ApiError(500, "Search query parameter 'sort' not found");
//     }

//         const companies = await Company.aggregate([
//             { $sort: { [_sort]: 1 } }

//         ]);

//         return res.status(200).json(new ApiResponse(
//             200,
//             companies,
//             "Companies fetched successfully"
//         ));
// });

const getAllDetails = asyncHandler(async (req, res) => {
  const { q, _sort, page, perPage } = req.query;

  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(perPage, 10) || 10;

  let query = {};

  if (q) {
    query = { companyName: { $regex: q, $options: "i" } };
  }

  let companies;

  if (_sort) {
    companies = await Company.aggregate([
      { $match: query },
      { $sort: { [_sort]: 1 } },
      { $skip: (parsedPage - 1) * parsedLimit },
      { $limit: parsedLimit },
    ]);
  } else {
    // Normal find with pagination
    companies = await Company.find(query)
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);
  }

  if (!companies || companies.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "No companies found"));
  }

  const totalCount = await Company.countDocuments(query);
  const totalPages = Math.ceil(totalCount / parsedLimit);

  return res.status(200).json({
    status: 200,
    data: companies,
    message: "Companies fetched successfully",
    pagination: {
      totalItems: totalCount,
      totalPages,
      currentPage: parsedPage,
      pageSize: parsedLimit,
    },
  });
});

export { registerCompany,
     getAllDetails, 
    //  companySearch, 
    //  companySort
     };
