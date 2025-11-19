// Get data from webhook and user stats
const webhookData = $("Webhook").item.json.body;
const userStats = $("Get User Stats").item.json.data;

// Extract module data from webhook module_metadata
const moduleMetadata = webhookData.module_metadata || {};
const nextModuleMetadata = webhookData.next_module_metadata || null;

// Build complete module data object with all metadata
const moduleData = {
  // IDs
  moduleKey: webhookData.module_key,
  id: moduleMetadata.unitNumber
    ? (moduleMetadata.unitNumber - 1) * 12 + 1
    : null, // Approximate numeric ID

  // Core module info from metadata
  title: moduleMetadata.title || `Module ${webhookData.module_key}`,
  capabilities: moduleMetadata.capabilities || [],
  realWorldUse: moduleMetadata.realWorldUse || "continue learning French",
  nextModuleTeaser:
    moduleMetadata.nextModuleTeaser || "Keep building your French skills",
  milestone: moduleMetadata.milestone || null,
  utilityScore: moduleMetadata.utilityScore || 5,
  isUnitCompletion: moduleMetadata.isUnitCompletion || false,
  unitNumber: moduleMetadata.unitNumber || null,

  // Next module info
  nextModule: nextModuleMetadata
    ? {
        title: nextModuleMetadata.title,
        realWorldUse: nextModuleMetadata.realWorldUse,
        capabilities: nextModuleMetadata.capabilities || [],
      }
    : null,
};

// Combine all data for email template
const emailData = {
  // User info
  user_id: webhookData.user_id,
  email: webhookData.email,
  name: webhookData.name,

  // Module info (complete with all metadata)
  module: moduleData,

  // User stats (from edge function)
  userStats: userStats,

  // Completion info
  examScore: webhookData.exam_score,
  completedAt: webhookData.completed_at,
  modulesCompleted: webhookData.modules_completed,

  // Review questions (from N8N_MODULE_COMPLETION_WORKFLOW.md)
  review_question_1: `How do you use the main concept from ${moduleData.title}?`,
  review_question_2: `What's a key phrase from this module?`,
  review_question_3: `Apply ${moduleData.title} in a sentence`,
};

return [emailData];
